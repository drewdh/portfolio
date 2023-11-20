import { FlashbarProps } from '@cloudscape-design/components/flashbar';
import { ButtonProps } from '@cloudscape-design/components/button';
import { useState } from 'react';
import without from 'lodash/without';
import { v4 as uuidv4 } from 'uuid';

import usePreviewNotification from '../usePreviewNotification';

let isInit = false;

export default function useNotifications(): State {
  const [items, setItems] = useState<FlashbarProps.MessageDefinition[]>([]);
  const previewNotification = usePreviewNotification();

  function dismissNotification(id: string) {
    setItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => item.id === id);
      if (itemToRemove) {
        return without(prevItems, itemToRemove);
      }
      return prevItems;
    });
  }

  function addNotification(item: FlashbarProps.MessageDefinition) {
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
  }

  // Show preview disclaimer if not already dismissed
  if (!isInit && previewNotification) {
    addNotification(previewNotification);
    isInit = true;
  }

  return {
    addNotification,
    items,
  };
}

interface State {
  addNotification: (item: FlashbarProps.MessageDefinition) => void;
  items: FlashbarProps.MessageDefinition[];
}
