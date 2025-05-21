import styles from './styles.module.scss';
import Button from 'common/button';

export default function App() {
  return (
    <div className={styles.container}>
      <h1>Hi. I'm Drew.</h1>
      <Button href="https://www.linkedin.com/in/drew-hanberry-b56264105/">LinkedIn</Button>
    </div>
  );
}
