import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { getCommonHeaders, useGetUser } from '../api';
import Box from '@cloudscape-design/components/box';
import styles from './chat.module.scss';
import SpaceBetween from '@cloudscape-design/components/space-between';
import ChatMessage from './chat-message';

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
  return resp.json();
}
function deleteSubscription(subscriptionId: string): Promise<unknown> {
  return fetch(`https://api.twitch.tv/helix/eventsub/subscriptions?id=${subscriptionId}`, {
    method: 'DELETE',
    headers: getCommonHeaders(),
  });
}

export default function Chat({ broadcasterUserId, height }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<SimpleMessage[]>([]);
  const { data: user } = useGetUser();
  // subtract border (1px + 1px), container heading height (48px), and content padding (4px top, 20px bottom)
  const heightString = `${(height ?? 1) - 74}px`;

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
        subscribe({
          sessionId: (message as WelcomeMessage).payload.session.id,
          broadcasterUserId,
          userId: user.id,
        })
          .then((resp) => (subscriptionId = resp.data[0].id))
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
          return [...prevMessages, newMessage];
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
    <Container header={<Header variant="h2">Chat</Header>}>
      <div
        style={{
          height: heightString,
          maxHeight: heightString,
          overflow: 'auto',
        }}
        ref={scrollContainerRef}
      >
        {messages.map((message) => (
          <ChatMessage message={message} key={message.message_id} />
        ))}
      </div>
    </Container>
  );
}

interface Props {
  broadcasterUserId: string | undefined;
  height: number | undefined;
}
