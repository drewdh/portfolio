import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router';

import { NotificationsContext } from './app-layout/useNotifications';
import { Pathname } from './routes';

export function usePreviewNotification() {
  console.log('test from preview notification');
  const { addNotification, dismissNotification } = useContext(NotificationsContext);
  const { pathname } = useLocation();

  useEffect((): undefined | (() => void) => {
    const content = 'This site is under development. Some features might not work as expected.';
    const dismissible = pathname !== Pathname.Home;
    const id = addNotification({ content, dismissible });
    return () => {
      dismissNotification(id);
    }
  }, [addNotification, dismissNotification, pathname]);
}
