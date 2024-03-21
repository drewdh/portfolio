import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { twitchClient, useGetUsers } from '../api';
import Box from '@cloudscape-design/components/box';
import styles from './chat.module.scss';
import SpaceBetween from '@cloudscape-design/components/space-between';
import ChatMessage from './chat-message';
import Alert from '@cloudscape-design/components/alert';
import {
  Badge,
  ButtonDropdown,
  ButtonDropdownProps,
  ExpandableSection,
  NonCancelableCustomEvent,
} from '@cloudscape-design/components';
import Link from '@cloudscape-design/components/link';
import Button from '@cloudscape-design/components/button';
import { connectHref } from '../page';
import Feedback from '../../../feedback/feedback';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import clsx from 'clsx';
import ChatRestrictions from './chat-restrictions';
import {
  CreateEventSubSubscriptionResponse,
  DeleteEventSubSubscriptionResponse,
  WelcomeMessage,
  ChatMessage as ChatMessageType,
  Fragment,
} from '../twitch-types';
import Popover from '@cloudscape-design/components/popover';

export interface SimpleMessage {
  color: string;
  fragments: Fragment[];
  message_id: string;
  message_text: string;
  chatter_user_name: string;
  chatter_user_id: string;
  subscriber_month_count: string | undefined;
}

interface SubscribeRequest {
  sessionId: string;
  broadcasterUserId: string;
  userId: string;
}
async function subscribe(request: SubscribeRequest): Promise<CreateEventSubSubscriptionResponse> {
  const requestBody = {
    type: 'channel.chat.message',
    version: 1,
    condition: {
      broadcaster_user_id: request.broadcasterUserId,
      user_id: request.userId,
    },
    transport: {
      method: 'websocket',
      session_id: request.sessionId,
    },
  };
  return twitchClient.createEventSubSubscription(requestBody);
}
function deleteSubscription(subscriptionId: string): Promise<DeleteEventSubSubscriptionResponse> {
  return twitchClient.deleteEventSubSubscription({ id: subscriptionId });
}

enum SettingsId {
  Restrictions = 'restrictions',
}

export default function Chat({ broadcasterUserId, height }: Props) {
  const [isScrollPaused, setIsScrollPaused] = useState<boolean>(false);
  const [isRestrictionsModalVisible, setIsRestrictionsModalVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isReconnectError, setIsReconnectError] = useState<boolean>(false);
  const [isFeedbackVisible, setIsFeedbackVisible] = useState<boolean>(false);
  const [error, setError] = useState<object | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<SimpleMessage[]>([]);
  const { data: userData } = useGetUsers({});
  const user = userData?.data[0];
  // subtract border (1px + 1px), container heading height (53px), and content padding (4px top, 8px bottom)
  const heightString = `${(height ?? 1) - 71}px`;

  useEffect(() => {
    if (!broadcasterUserId || !user?.id) {
      return;
    }
    let subscriptionId: string;
    const ws = new WebSocket('wss://eventsub.wss.twitch.tv/ws');
    ws.onopen = function (event) {
      console.log(event);
    };

    ws.onmessage = function (event) {
      const message: WelcomeMessage | ChatMessageType = JSON.parse(event.data);
      if (message.metadata.message_type === 'session_welcome') {
        setError(null);
        setIsReconnectError(false);
        subscribe({
          sessionId: (message as WelcomeMessage).payload.session.id,
          broadcasterUserId,
          userId: user.id,
        })
          .then((resp) => (subscriptionId = resp.data[0].id))
          .catch((error) => {
            if (error.message === 'subscription missing proper authorization') {
              setIsReconnectError(true);
            } else {
              setError(error);
            }
          })
          .finally(() => setIsLoading(false));
        return;
      }
      if (message.metadata.message_type === 'notification') {
        const { event } = (message as ChatMessageType).payload;
        // console.log(event);
        const newMessage: SimpleMessage = {
          color: event.color,
          fragments: event.message.fragments,
          message_id: event.message_id,
          message_text: event.message.text,
          chatter_user_id: event.chatter_user_id,
          chatter_user_name: event.chatter_user_name,
          subscriber_month_count: event.badges.find((badge) => badge.set_id === 'subscriber')?.info,
        };
        setMessages((prevMessages) => {
          // Some messages can be duplicated, so don't process these again
          // https://dev.twitch.tv/docs/eventsub/#handling-duplicate-events
          const wasProcessed = prevMessages.some(
            (message) => message.message_id === newMessage.message_id
          );
          if (wasProcessed) {
            return prevMessages;
          }
          // @ts-ignore
          // console.log(message.payload.event);
          return [newMessage, ...prevMessages].slice(0, 500);
        });
      }
    };
    return () => {
      ws.close();
      subscriptionId && deleteSubscription(subscriptionId);
    };
  }, [broadcasterUserId, user?.id]);

  useLayoutEffect(() => {
    if (!scrollContainerRef.current || isScrollPaused) {
      return;
    }
    scrollContainerRef.current.scrollTo({
      top: scrollContainerRef.current.scrollTop + scrollContainerRef.current.offsetHeight,
      behavior: 'smooth',
    });
  }, [messages, scrollContainerRef, isScrollPaused]);

  function handleItemClick(event: NonCancelableCustomEvent<ButtonDropdownProps.ItemClickDetails>) {
    const { id } = event.detail;
    if (id === SettingsId.Restrictions) {
      setIsRestrictionsModalVisible(true);
    }
  }

  return (
    <>
      <Container
        disableHeaderPaddings
        disableContentPaddings
        header={
          <div className={styles.chatHeader}>
            <Header
              variant="h2"
              info={
                <Box color="text-status-info" display="inline">
                  <Popover
                    header="Beta feature"
                    size="medium"
                    triggerType="text"
                    content="Chat is in beta. Some functionality may not work as expected."
                    renderWithPortal={true}
                  >
                    <Box color="text-status-info" fontSize="body-s" fontWeight="bold">
                      Beta
                    </Box>
                  </Popover>
                </Box>
              }
              actions={
                <ButtonDropdown
                  onItemClick={handleItemClick}
                  expandableGroups
                  items={[{ text: 'View restrictions', id: SettingsId.Restrictions }]}
                  variant="icon"
                />
              }
            >
              Chat
            </Header>
          </div>
        }
      >
        <div
          className={styles.chatContainer}
          ref={scrollContainerRef}
          style={{
            height: heightString,
            maxHeight: heightString,
          }}
        >
          {isLoading && (
            <div className={styles.statusContainer}>
              <StatusIndicator type="loading">Loading chat</StatusIndicator>
            </div>
          )}
          {!isLoading && !error && !isReconnectError && !messages.length && (
            <div className={clsx(styles.statusContainer, styles.empty)}>
              <b>No new messages</b>
            </div>
          )}
          {isReconnectError && (
            <Alert
              header="Chat not enabled"
              action={
                <Button
                  onClick={() => localStorage.setItem('access_token', '')}
                  href={connectHref}
                  iconName="external"
                  iconAlign="right"
                  target="_blank"
                >
                  Reconnect
                </Button>
              }
            >
              This site's Twitch permissions have changed. Reconnect to Twitch and reload the page
              to enable chat.
            </Alert>
          )}
          {error && (
            <Alert type="error" header="Failed to load chat">
              <SpaceBetween size="m">
                <div>
                  Reload the page or try again later.{' '}
                  <Link
                    href="#"
                    onFollow={(e) => {
                      e.preventDefault();
                      setIsFeedbackVisible(true);
                    }}
                    variant="primary"
                    color="inverted"
                  >
                    Send feedback
                  </Link>{' '}
                  and share more details.
                </div>
                <ExpandableSection headerText="Error details">
                  <Box variant="pre">{JSON.stringify(error, null, 2)}</Box>
                </ExpandableSection>
              </SpaceBetween>
            </Alert>
          )}
          {!error && !isLoading && (
            <div className={styles.messages}>
              {messages.map((message) => (
                <ChatMessage
                  onScrollPause={() => setIsScrollPaused(true)}
                  message={message}
                  key={message.message_id}
                />
              ))}
            </div>
          )}
        </div>
      </Container>
      <Feedback visible={isFeedbackVisible} onDismiss={() => setIsFeedbackVisible(false)} />
      <ChatRestrictions
        visible={isRestrictionsModalVisible}
        onDismiss={() => setIsRestrictionsModalVisible(false)}
      />
    </>
  );
}

interface Props {
  broadcasterUserId: string | undefined;
  height: number | undefined;
}
