import { ReactNode } from 'react';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';

import styles from './styles.module.scss';

export default function Empty({ header, message, action }: Props) {
  return (
    <div className={styles.wrapper}>
      <SpaceBetween size="m">
        <div>
          <Box variant="strong" color="inherit">
            {header}
          </Box>
          {message && (
            <Box variant="p" color="inherit">
              {message}
            </Box>
          )}
        </div>
        {action}
      </SpaceBetween>
    </div>
  );
}

interface Props {
  header: string;
  message?: string;
  action?: ReactNode;
}
