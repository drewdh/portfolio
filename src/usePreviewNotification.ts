import { useContext, useEffect } from 'react';

import { NotificationsContext } from './app-layout/useNotifications';

export function usePreviewNotification() {
  const { addNotification, dismissNotification } = useContext(NotificationsContext);

  useEffect((): undefined | (() => void) => {
    const content = 'This site is under development. Some features might not work as expected.';
    const id = addNotification({ content, dismissible: true });
    return () => {
      dismissNotification(id);
    }
  }, [addNotification, dismissNotification]);
}
