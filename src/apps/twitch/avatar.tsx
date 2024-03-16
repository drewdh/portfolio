import styles from './styles.module.scss';
import { useGetUser } from './api';

export default function Avatar({ userName }: Props) {
  const { data } = useGetUser(userName);

  return (
    <img
      alt={data?.display_name}
      src={data?.profile_image_url.replace('300x300', '70x70')}
      className={styles.avatar}
    />
  );
}

interface Props {
  userName: string;
}
