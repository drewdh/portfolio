import styles from './styles.module.scss';
import Button from 'common/button';
import SpaceBetween from 'common/space-between';

export default function App() {
  return (
    <div className={styles.container}>
      <h1>Hi! I'm Drew.</h1>
      <SpaceBetween size="m" direction="horizontal">
        <Button href="https://www.linkedin.com/in/drew-hanberry-b56264105/">LinkedIn</Button>
        <Button href="https://github.com/drewdh">GitHub</Button>
        <Button href="mailto:hello@drewhanberry.com">Email</Button>
      </SpaceBetween>
    </div>
  );
}
