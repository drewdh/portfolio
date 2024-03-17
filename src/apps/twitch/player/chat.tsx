import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { getCommonHeaders, useGetUser } from '../api';
import Box from '@cloudscape-design/components/box';
import styles from './chat.module.scss';
import SpaceBetween from '@cloudscape-design/components/space-between';
import ChatMessage from './chat-message';
import Alert from '@cloudscape-design/components/alert';
import { ExpandableSection } from '@cloudscape-design/components';
import Link from '@cloudscape-design/components/link';
import Button from '@cloudscape-design/components/button';
import { connectHref } from '../page';
import Feedback from '../../../feedback/feedback';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import clsx from 'clsx';

interface Message {
  metadata: {
    messageId: string;
    messageTimestamp: string;
    message_type: string;
  };
}
interface WelcomeMessage extends Message {
  metadata: {
    messageId: string;
    messageTimestamp: string;
    message_type: 'session_welcome';
  };
  payload: {
    session: {
      id: string;
      connected_at: string;
      keepalive_timeout_seconds: number;
      reconnect_url: string | null;
      status: string;
    };
  };
}
interface ChatMessage extends Message {
  metadata: {
    messageId: string;
    messageTimestamp: string;
    message_type: 'notification';
  };
  payload: {
    event: {
      badges: unknown[];
      broadcaster_user_id: string;
      broadcaster_user_login: string;
      broadcaster_user_name: string;
      chatter_user_id: string;
      chatter_user_login: string;
      chatter_user_name: string;
      color: string;
      message: {
        fragments: unknown[];
        text: string;
      };
      message_id: string;
      message_type: 'text';
      reply: null;
    };
  };
}
export interface SimpleMessage {
  color: string;
  message_id: string;
  message_text: string;
  chatter_user_name: string;
}

interface SubscribeRequest {
  sessionId: string;
  broadcasterUserId: string;
  userId: string;
}
interface SubscribeResponse {
  data: Array<{
    id: string;
  }>;
  total: number;
  total_cost: number;
  max_total_cost: number;
}
async function subscribe(request: SubscribeRequest): Promise<SubscribeResponse> {
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
  const resp = await fetch('https://api.twitch.tv/helix/eventsub/subscriptions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getCommonHeaders(),
    },
    body: JSON.stringify(requestBody),
  });
  const respBody = await resp.json();
  if (!resp.ok) {
    throw respBody;
  } else {
    return respBody;
  }
}
function deleteSubscription(subscriptionId: string): Promise<unknown> {
  return fetch(`https://api.twitch.tv/helix/eventsub/subscriptions?id=${subscriptionId}`, {
    method: 'DELETE',
    headers: getCommonHeaders(),
  });
}

export default function Chat({ broadcasterUserId, height }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isReconnectError, setIsReconnectError] = useState<boolean>(false);
  const [isFeedbackVisible, setIsFeedbackVisible] = useState<boolean>(false);
  const [error, setError] = useState<object | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<SimpleMessage[]>([]);
  const { data: user } = useGetUser();
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
      const message: WelcomeMessage | ChatMessage = JSON.parse(event.data);
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
        const { event } = (message as ChatMessage).payload;
        const newMessage: SimpleMessage = {
          color: event.color,
          message_id: event.message_id,
          message_text: event.message.text,
          chatter_user_name: event.chatter_user_name,
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
          return [newMessage, ...prevMessages];
        });
      }
    };
    return () => {
      ws.close();
      deleteSubscription(subscriptionId);
    };
  }, [broadcasterUserId, user?.id]);

  useLayoutEffect(() => {
    if (!scrollContainerRef.current) {
      return;
    }
    scrollContainerRef.current.scrollTo({
      top: scrollContainerRef.current.scrollTop + scrollContainerRef.current.offsetHeight,
      behavior: 'smooth',
    });
  }, [messages, scrollContainerRef]);

  return (
    <>
      <Container
        disableHeaderPaddings
        disableContentPaddings
        header={
          <div className={styles.chatHeader}>
            <Header variant="h2">Chat</Header>
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
                <ChatMessage message={message} key={message.message_id} />
              ))}
            </div>
          )}
        </div>
      </Container>
      <Feedback visible={isFeedbackVisible} onDismiss={() => setIsFeedbackVisible(false)} />
    </>
  );
}

interface Props {
  broadcasterUserId: string | undefined;
  height: number | undefined;
}
