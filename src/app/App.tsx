import { useEffect } from 'react';
import '@cloudscape-design/global-styles/index.css';
import { useLocation } from 'react-router';

import { TopNavigation } from '../top-navigation/TopNavigation';
import { useUpdateTitle } from '../useUpdateTitle';
import { AppLayout } from '../app-layout/AppLayout';
import { NotificationsContext, useNotificationsClient } from '../app-layout/useNotifications';

function App() {
  const notificationsClient = useNotificationsClient();
  const updateTitle = useUpdateTitle();
  const location = useLocation();

  useEffect((): void => {
    updateTitle();
  }, [updateTitle, location]);

  return (
    <NotificationsContext.Provider value={notificationsClient}>
      <TopNavigation />
      <AppLayout />
    </NotificationsContext.Provider>
  );
}

export default App;
