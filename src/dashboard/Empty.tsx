import { ReactNode } from 'react';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';

import styles from './styles.module.scss';

export default function Empty({ actions, icon, title, description }: Props) {
  return (
    <div className={styles.verticalCenter}>
      <Box
        margin={{ vertical: 'xs' }}
        textAlign="center"
        color="text-body-secondary"
      >
        <SpaceBetween size="xxs">
          <div>
            {icon && <div>{icon}</div>}
            <Box variant="strong" color="inherit">
              {title}
            </Box>
            <Box variant="p" color="inherit">
              {description}
            </Box>
          </div>
          {actions}
        </SpaceBetween>
      </Box>
    </div>
  );
}

interface Props {
  actions?: ReactNode;
  icon?: ReactNode;
  title: string;
  description: string;
}
