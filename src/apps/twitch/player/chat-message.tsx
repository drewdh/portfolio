import styles from './chat.module.scss';
import Avatar from '../avatar';
import { useGetChannelFollowers, useGetUsers } from '../api';
import Box from '@cloudscape-design/components/box';
import Icon from '@cloudscape-design/components/icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBadgeCheck } from '@fortawesome/pro-solid-svg-icons';
import Emote from './emote';
import Link from '@cloudscape-design/components/link';
import { ReactNode } from 'react';
import clsx from 'clsx';
import ButtonDropdown from '@cloudscape-design/components/button-dropdown';
import { ChatEvent } from '../twitch-types';
import { formatDate } from 'date-fns';
import Button from '@cloudscape-design/components/button';
import Header from '@cloudscape-design/components/header';
import Container from '@cloudscape-design/components/container';

export function Message({ variant, message }: Props) {
  return (
    <span className={clsx(styles.message, variant === 'normal' && styles.normal)}>
      {message.message.fragments?.map((fragment, index) => {
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
                  <Link rel="noreferrer" href={string} target="_blank">
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

export default function ChatMessage({ message, onClick, variant = 'normal', onHide }: Props) {
  const { data: userData } = useGetUsers({ ids: [message.chatter_user_id] });
  const user = userData?.data[0];
  const { data: followerData } = useGetChannelFollowers(user?.id);

  if (variant === 'normal') {
    return (
      <div onClick={onClick} className={styles.messageWrapper}>
        <Avatar userId={message.chatter_user_id} />
        <div className={styles.normalMessage}>
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
    );
  }

  return (
    <div>
      <Container disableHeaderPaddings disableContentPaddings>
        <Box padding={{ vertical: 's', horizontal: 'm' }}>
          <Box float="right">
            <Button variant="icon" onClick={onHide} iconName="close" />
          </Box>
          <div style={{ display: 'flex', gap: '8px', paddingBottom: '8px' }}>
            <Avatar userId={message.chatter_user_id} />
            <div>
              <b>{message.chatter_user_name}</b>
              {user?.broadcaster_type === 'partner' && (
                <Box variant="span" padding={{ left: 'xxs' }}>
                  <Icon svg={<FontAwesomeIcon icon={faBadgeCheck} color="#a970ff" />} />
                </Box>
              )}
              <Box color="text-status-inactive" fontSize="body-s">
                {Number(followerData?.total).toLocaleString(undefined, { notation: 'compact' })}{' '}
                followers
              </Box>
            </div>
          </div>
          <Message message={message} variant={variant} />
        </Box>
      </Container>
    </div>
  );
}

interface Props {
  message: ChatEvent;
  onHide?: () => void;
  onClick?: () => void;
  variant?: 'featured' | 'normal';
}
