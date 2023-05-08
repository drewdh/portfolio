import { BoardProps } from '@cloudscape-design/board-components/board';
import { useCallback, useState } from 'react';
import { NonCancelableCustomEvent } from '@cloudscape-design/components';

import { WidgetConfig } from '../widgets/interfaces';
import { useWidgetLayout } from '../widgets/widget-config';

export default function useDashboard(): State {
  const [isResetModalVisible, setIsResetModalVisible] = useState<boolean>(false);
  const {
    layout: items,
    resetLayout,
    updateLayout: setItems,
  } = useWidgetLayout();

  const handleItemsChange = useCallback((event: NonCancelableCustomEvent<BoardProps.ItemsChangeDetail<WidgetConfig>>): void => {
    setItems(event.detail.items);
  }, [setItems]);

  const handleResetClick = useCallback((requiresConfirm: boolean): void => {
    if (requiresConfirm) {
      setIsResetModalVisible(true);
    } else {
      resetLayout();
    }
  }, [resetLayout]);

  const handleResetModalDismiss = useCallback((): void => {
    setIsResetModalVisible(false);
  }, []);

  const handleResetConfirm = useCallback((): void => {
    setIsResetModalVisible(false);
    resetLayout();
  }, [resetLayout]);

  const renderItem = useCallback((item: BoardProps.Item<WidgetConfig>, actions: BoardProps.ItemActions): JSX.Element => {
    return <item.data.widget onRemove={actions.removeItem} />;
  }, []);

  return {
    handleItemsChange,
    handleResetClick,
    handleResetConfirm,
    handleResetModalDismiss,
    isResetModalVisible,
    items,
    renderItem,
  };
}

interface State {
  handleItemsChange: (event: NonCancelableCustomEvent<BoardProps.ItemsChangeDetail<WidgetConfig>>) => void;
  handleResetModalDismiss: () => void;
  handleResetConfirm: () => void;
  handleResetClick: (requiresConfirm: boolean) => void;
  isResetModalVisible: boolean;
  items: ReadonlyArray<BoardProps.Item<WidgetConfig>>;
  renderItem: (item: BoardProps.Item<WidgetConfig>, actions: BoardProps.ItemActions) => JSX.Element;
}
