import styles from './styles.module.scss';
import { useGetUser } from './api';

export default function Avatar({ userName, size }: Props) {
  const { data } = useGetUser(userName);
  const widthAndHeight = size === 'small' ? 24 : 35;
  // const dimensions = size === 'small' ? '70x70' : '70x70';

  return (
    <img
      width={widthAndHeight}
      height={widthAndHeight}
      alt={data?.display_name}
      src={data?.profile_image_url.replace('300x300', '70x70')}
      className={styles.avatar}
    />
  );
}

interface Props {
  userName: string;
  size?: 'normal' | 'small';
}
