import { BoardProps } from '@cloudscape-design/board-components/board';
import { useCallback } from 'react';
import { NonCancelableCustomEvent } from '@cloudscape-design/components';

import { WidgetConfig } from '../widgets/interfaces';
import { useWidgetLayout } from '../widgets/widget-config';

export default function useDashboard(): State {
  const {
    layout: items,
    resetLayout,
    updateLayout: setItems,
  } = useWidgetLayout();

  const handleItemsChange = useCallback((event: NonCancelableCustomEvent<BoardProps.ItemsChangeDetail<WidgetConfig>>): void => {
    setItems(event.detail.items);
  }, [setItems]);

  const renderItem = useCallback((item: BoardProps.Item<WidgetConfig>, actions: BoardProps.ItemActions): JSX.Element => {
    return <item.data.widget onRemove={actions.removeItem} />;
  }, []);

  return {
    handleItemsChange,
    items,
    renderItem,
    resetLayout,
  };
}

interface State {
  handleItemsChange: (event: NonCancelableCustomEvent<BoardProps.ItemsChangeDetail<WidgetConfig>>) => void;
  items: ReadonlyArray<BoardProps.Item<WidgetConfig>>;
  renderItem: (item: BoardProps.Item<WidgetConfig>, actions: BoardProps.ItemActions) => JSX.Element;
  resetLayout: () => void;
}
