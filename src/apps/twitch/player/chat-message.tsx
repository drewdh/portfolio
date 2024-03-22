import styles from './chat.module.scss';
import { SimpleMessage } from './chat';
import Avatar from '../avatar';
import Popover from '@cloudscape-design/components/popover';
import { useGetChannelFollowers, useGetUsers } from '../api';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import Icon from '@cloudscape-design/components/icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBadgeCheck } from '@fortawesome/pro-solid-svg-icons';
import Emote from './emote';
import Link from '@cloudscape-design/components/link';
import { ReactNode } from 'react';
import clsx from 'clsx';
import ButtonDropdown from '@cloudscape-design/components/button-dropdown';

export function Message({ variant, message }: Props) {
  return (
    <span className={clsx(styles.message, variant === 'normal' && styles.normal)}>
      {message.fragments?.map((fragment, index) => {
        if (fragment.type === 'emote') {
          return <Emote key={index} emote={fragment.emote} />;
        }
        return (
          <span key={index}>
            {/* TODO: Make this more readable */}
            {/* Make URLs into Links */}
            {fragment.text.split(' ').map((string) => {
              let finalString: ReactNode = string;
              if (string.startsWith('https://')) {
                finalString = (
                  <Link
                    fontSize={variant === 'featured' ? 'heading-s' : 'body-s'}
                    rel="noreferrer"
                    href={string}
                    target="_blank"
                  >
                    {string}
                  </Link>
                );
              }
              return <>{finalString} </>;
            })}
          </span>
        );
      })}
    </span>
  );
}

export default function ChatMessage({ message, onClick, variant = 'normal' }: Props) {
  const { data: userData } = useGetUsers({ ids: [message.chatter_user_id] });
  const user = userData?.data[0];
  const { data: followerData } = useGetChannelFollowers(user?.id);

  if (variant === 'normal') {
    return (
      <div onClick={onClick}>
        <Box fontSize="body-s">
          <div className={styles.messageWrapper}>
            <Avatar userId={message.chatter_user_id} size="small" />
            <div>
              <span className={styles.username}>
                {/*<b style={{ color: message.color }}>{message.chatter_user_name}</b>*/}
                <b>{message.chatter_user_name}</b>
                {user?.broadcaster_type === 'partner' && (
                  <Box variant="span" padding={{ left: 'xxs' }}>
                    <Icon svg={<FontAwesomeIcon icon={faBadgeCheck} color="#a970ff" />} />
                  </Box>
                )}
              </span>
              <Message message={message} variant={variant} />
            </div>
          </div>
        </Box>
      </div>
    );
  }

  return (
    <Box fontSize="heading-s">
      <Box float="right">
        <ButtonDropdown items={[]} variant="icon" />
      </Box>
      <div style={{ display: 'flex', gap: '8px', paddingBottom: '8px' }}>
        <Avatar userId={message.chatter_user_id} />
        <Box fontSize="heading-xs">
          <b>{message.chatter_user_name}</b>
          {user?.broadcaster_type === 'partner' && (
            <Box variant="span" padding={{ left: 'xxs' }}>
              <Icon svg={<FontAwesomeIcon icon={faBadgeCheck} color="#a970ff" />} />
            </Box>
          )}
          <Box color="text-status-inactive">
            {Number(followerData?.total).toLocaleString(undefined, { notation: 'compact' })}{' '}
            followers
          </Box>
        </Box>
      </div>
      <Message message={message} variant={variant} />
    </Box>
  );
}

interface Props {
  message: SimpleMessage;
  onClick?: () => void;
  variant?: 'featured' | 'normal';
}
