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

export default function ChatMessage({ message, onScrollPause }: Props) {
  const { data: userData } = useGetUsers({ ids: [message.chatter_user_id] });
  const user = userData?.data[0];
  const { data: followerData } = useGetChannelFollowers(user?.id);

  return (
    <div className={styles.messageWrapper}>
      <div>
        <Popover
          triggerType="custom"
          header="Message details"
          renderWithPortal
          content={
            <>
              <Box variant="h4" padding={{ bottom: 'm' }}>
                <SpaceBetween size="xs" direction="horizontal" alignItems="center">
                  <Avatar color={message.color} userId={message.chatter_user_id} />
                  <div>
                    <div>{user?.display_name}</div>
                    <Box color="text-body-secondary" fontWeight="normal">
                      {Number(followerData?.total).toLocaleString(undefined, {
                        notation: 'compact',
                      })}{' '}
                      followers
                    </Box>
                  </div>
                </SpaceBetween>
              </Box>
              {message.subscriber_month_count ? (
                <StatusIndicator type="success">
                  Subscribed to streamer for {message.subscriber_month_count} months
                </StatusIndicator>
              ) : (
                <StatusIndicator type="stopped">Not subscribed to streamer</StatusIndicator>
              )}
            </>
          }
        >
          <span
            className={styles.username}
            onClick={() => {
              console.log('hey');
              onScrollPause?.();
            }}
          >
            <b style={{ color: message.color }}>{message.chatter_user_name}</b>

            {user?.broadcaster_type === 'partner' && (
              <Box variant="span" padding={{ left: 'xxs' }}>
                <Icon svg={<FontAwesomeIcon icon={faBadgeCheck} color="#a970ff" />} />
              </Box>
            )}
          </span>
        </Popover>{' '}
        <span className={styles.message}>
          {message.fragments?.map((fragment, index) => {
            if (fragment.type === 'emote') {
              return <Emote key={index} emote={fragment.emote} />;
            }
            return <span key={index}>{fragment.text}</span>;
          })}
        </span>
      </div>
    </div>
  );
}

interface Props {
  message: SimpleMessage;
  onScrollPause?: () => void;
}
