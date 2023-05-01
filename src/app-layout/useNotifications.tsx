import { createContext, useCallback, useState } from 'react';
import { FlashbarProps } from '@cloudscape-design/components/flashbar';
import { v4 as uuidv4 } from 'uuid';
import { ButtonProps } from '@cloudscape-design/components';

interface NotificationClient {
  notifications: ReadonlyArray<FlashbarProps.MessageDefinition>;
  addNotification: (notification: FlashbarProps.MessageDefinition) => string;
  dismissNotification: (id: string) => void;
}

export function useNotificationsClient(): NotificationClient {
  const [notifications, setNotifications] = useState<ReadonlyArray<FlashbarProps.MessageDefinition>>([]);

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prevState) => {
      return prevState.filter((notification) => {
        return notification.id !== id;
      });
    });
  }, []);

  const addNotification = useCallback((notification: FlashbarProps.MessageDefinition): string => {
    const id = notification.id || uuidv4();
    const onDismiss = (event: CustomEvent<ButtonProps.ClickDetail>) => {
      notification.onDismiss?.(event);
      dismissNotification(id);
    };
    setNotifications((prevState) => {
      return prevState.concat([{
        ...notification,
        id,
        onDismiss,
      }]);
    });
    return id;
  }, [dismissNotification]);

  return {
    notifications,
    addNotification,
    dismissNotification,
  };
}

const defaultNotificationsClient: NotificationClient = {
  notifications: [],
  addNotification: () => '',
  dismissNotification: () => {},
};
export const NotificationsContext = createContext<NotificationClient>(defaultNotificationsClient);
