import { useCallback, useContext, useEffect, useMemo } from 'react';

import { NotificationsContext } from './app-layout/useNotifications';
import { LocalStorageKey, useLocalStorage } from './useLocalStorage';

export function usePreviewNotification() {
  const {
    getItem: getIsDismissed,
    setItem: saveIsDismissed,
  } = useLocalStorage<boolean>({
    defaultValue: false,
    key: LocalStorageKey.IsPreviewNotificationDismissed,
  });
  const { addNotification, dismissNotification } = useContext(NotificationsContext);

  const isDismissed = useMemo((): boolean => {
    return getIsDismissed();
  }, [getIsDismissed]);

  const handleDismiss = useCallback((): void => {
    saveIsDismissed(true);
  }, [saveIsDismissed]);

  useEffect((): undefined | (() => void) => {
    if (isDismissed) {
      return;
    }
    const content = 'This site is under development. Some features might not work as expected.';
    const id = addNotification({
      content,
      dismissible: true,
      onDismiss: handleDismiss,
    });
    return () => {
      dismissNotification(id);
    }
  }, [handleDismiss, isDismissed, addNotification, dismissNotification]);
}
