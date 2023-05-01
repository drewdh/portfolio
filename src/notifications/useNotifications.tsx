import { FlashbarProps } from '@cloudscape-design/components/flashbar';
import { ButtonProps } from '@cloudscape-design/components/button';
import { useCallback, useEffect, useState } from 'react';
import without from 'lodash/without';
import { v4 as uuidv4 } from 'uuid';

import usePreviewNotification from '../usePreviewNotification';

let isInit = false;

export default function useNotifications(): State {
  const [items, setItems] = useState<FlashbarProps.MessageDefinition[]>([]);
  const previewNotification = usePreviewNotification();

  const dismissNotification = useCallback((id: string): void => {
    setItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => item.id === id);
      if (itemToRemove) {
        return without(prevItems, itemToRemove);
      }
      return prevItems;
    });
  }, []);

  const addNotification = useCallback((item: FlashbarProps.MessageDefinition): void => {
    const id = item.id || uuidv4();
    const newItem: FlashbarProps.MessageDefinition = {
      ...item,
      id,
      onDismiss: (event: CustomEvent<ButtonProps.ClickDetail>) => {
        item.onDismiss?.(event);
        dismissNotification(id);
      },
    };
    setItems((prevItems) => {
      return [...prevItems, newItem];
    });
  }, [dismissNotification]);

  // Show preview disclaimer if not already dismissed
  useEffect(function showPreviewNotification(): void {
    if (!isInit && previewNotification) {
      addNotification(previewNotification);
    }
    isInit = true;
  }, [addNotification, previewNotification]);

  return {
    addNotification,
    items,
  };
}

interface State {
  addNotification: (item: FlashbarProps.MessageDefinition) => void;
  items: FlashbarProps.MessageDefinition[];
}