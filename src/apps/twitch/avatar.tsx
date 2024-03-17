import clsx from 'clsx';
import { colorBackgroundInputDisabled } from '@cloudscape-design/design-tokens';

import styles from './styles.module.scss';
import { useGetUser } from './api';

export default function Avatar({ userName, size, color }: Props) {
  const { data } = useGetUser(userName);

  return (
    <div
      role="img"
      aria-label={userName}
      style={{
        backgroundImage: `url(${data?.profile_image_url.replace('300x300', '70x70')})`,
        backgroundColor: color ?? colorBackgroundInputDisabled,
      }}
      className={clsx(styles.avatar, size === 'small' && styles.small)}
    >
      <div className={clsx(styles.spacer, size === 'small' && styles.small)} />
    </div>
  );
}

interface Props {
  color?: string;
  userName: string;
  size?: 'normal' | 'small';
}
