import clsx from 'clsx';

import styles from './styles.module.scss';
import { useGetUser } from './api';

export default function Avatar({ userName, size }: Props) {
  const { data } = useGetUser(userName);

  return (
    <div
      role="img"
      aria-label={userName}
      style={{ backgroundImage: `url(${data?.profile_image_url.replace('300x300', '70x70')})` }}
      className={clsx(styles.avatar, size === 'small' && styles.small)}
    />
  );
}

interface Props {
  userName: string;
  size?: 'normal' | 'small';
}
