import Box from '@cloudscape-design/components/box';

import styles from './chat.module.scss';
import { SimpleMessage } from './chat';
import Avatar from '../avatar';
import SpaceBetween from '@cloudscape-design/components/space-between';

export default function ChatMessage({ message }: Props) {
  return (
    <div className={styles.messageWrapper}>
      <Avatar userName={message.chatter_user_name} size="small" />
      <div>
        <b className={styles.username} style={{ color: message.color }}>
          {message.chatter_user_name}
        </b>{' '}
        <span className={styles.message}>{message.message_text}</span>
      </div>
    </div>
  );
}

interface Props {
  message: SimpleMessage;
}
