import { FlashbarProps } from '@cloudscape-design/components/flashbar';
import without from 'lodash/without';
import { ButtonProps } from '@cloudscape-design/components/button';
import { create } from 'zustand/react';
import { v4 as uuidV4 } from 'uuid';

export interface MessageDefinition extends FlashbarProps.MessageDefinition {
  /** @default 'never' */
  persistOnNavigate?: 'once' | 'always' | 'never';
}

export interface UseNotificationsState {
  clearNotifications: () => void;
  notifications: MessageDefinition[];
  removeNotification: (id: string) => void;
  setNotifications: (items: MessageDefinition[]) => void;
  pushNotification: (item: MessageDefinition) => void;
}
export const useNotifications = create<UseNotificationsState>((set, get) => ({
  clearNotifications: () => set({ notifications: [] }),
  notifications: [],
  setNotifications: (notifications: MessageDefinition[]) => {
    set({ notifications });
  },
  removeNotification: (id: string) => {
    const prevItems = get().notifications;
    const itemToRemove = prevItems.find((item) => item.id === id);
    if (itemToRemove) {
      set({ notifications: without(prevItems, itemToRemove) });
    } else {
      set({ notifications: prevItems });
    }
  },
  pushNotification: (item) => {
    const id = item.id || uuidV4();
    const newItem: FlashbarProps.MessageDefinition = {
      ...item,
      id,
      onDismiss: (event: CustomEvent<ButtonProps.ClickDetail>) => {
        item.onDismiss?.(event);
        get().removeNotification(id);
      },
    };
    const prevItems = get().notifications;
    set({ notifications: [...prevItems, newItem] });
  },
}));
