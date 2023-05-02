import { BoardProps } from '@cloudscape-design/board-components/board';
import { JSXElementConstructor, useCallback, useMemo, useState } from 'react';
import { NonCancelableCustomEvent } from '@cloudscape-design/components';

import Timer from '../widgets/timer';

interface WidgetProps extends Record<string, any> {
  onRemove: () => void;
}

interface WidgetConfig {
  title: string;
  widget: JSXElementConstructor<WidgetProps>;
}

function createAnnouncement(
  operationAnnouncement: string,
  conflicts: ReadonlyArray<BoardProps.Item<WidgetConfig>>,
  disturbed: ReadonlyArray<BoardProps.Item<WidgetConfig>>
) {
  const conflictsAnnouncement =
    conflicts.length > 0 ? `Conflicts with ${conflicts.map(c => c.data.title).join(', ')}.` : '';
  const disturbedAnnouncement = disturbed.length > 0 ? `Disturbed ${disturbed.length} items.` : '';
  return [operationAnnouncement, conflictsAnnouncement, disturbedAnnouncement].filter(Boolean).join(' ');
}

export default function useDashboard(): State {
  const [items, setItems] = useState<ReadonlyArray<BoardProps.Item<WidgetConfig>>>([
    {
      id: '1',
      rowSpan: 3,
      columnSpan: 2,
      data: {
        title: 'Pomodoro timer',
        widget: Timer,
      },
    },
  ]);

  const handleItemsChange = useCallback((event: NonCancelableCustomEvent<BoardProps.ItemsChangeDetail<WidgetConfig>>): void => {
    setItems(event.detail.items);
  }, []);

  const i18nStrings = useMemo((): BoardProps.I18nStrings<WidgetConfig> => {
    return {
      liveAnnouncementDndStarted: operationType => (operationType === 'resize' ? 'Resizing' : 'Dragging'),
      liveAnnouncementDndItemReordered: operation => {
        const columns = `column ${operation.placement.x + 1}`;
        const rows = `row ${operation.placement.y + 1}`;
        return createAnnouncement(
          `Item moved to ${operation.direction === 'horizontal' ? columns : rows}.`,
          operation.conflicts,
          operation.disturbed
        );
      },
      liveAnnouncementDndItemResized: operation => {
        const columnsConstraint = operation.isMinimalColumnsReached ? ' (minimal)' : '';
        const rowsConstraint = operation.isMinimalRowsReached ? ' (minimal)' : '';
        const sizeAnnouncement =
          operation.direction === 'horizontal'
            ? `columns ${operation.placement.width}${columnsConstraint}`
            : `rows ${operation.placement.height}${rowsConstraint}`;
        return createAnnouncement(`Item resized to ${sizeAnnouncement}.`, operation.conflicts, operation.disturbed);
      },
      liveAnnouncementDndItemInserted: operation => {
        const columns = `column ${operation.placement.x + 1}`;
        const rows = `row ${operation.placement.y + 1}`;
        return createAnnouncement(`Item inserted to ${columns}, ${rows}.`, operation.conflicts, operation.disturbed);
      },
      liveAnnouncementDndCommitted: operationType => `${operationType} committed`,
      liveAnnouncementDndDiscarded: operationType => `${operationType} discarded`,
      liveAnnouncementItemRemoved: op => createAnnouncement(`Removed item ${op.item.data.title}.`, [], op.disturbed),
      navigationAriaLabel: 'Board navigation',
      navigationAriaDescription: 'Click on non-empty item to move focus over',
      navigationItemAriaLabel: item => (item ? item.data.title : 'Empty'),
    };
  }, []);

  const renderItem = useCallback((item: BoardProps.Item<WidgetConfig>, actions: BoardProps.ItemActions): JSX.Element => {
    return <item.data.widget onRemove={actions.removeItem} />;
  }, []);

  return {
    handleItemsChange,
    i18nStrings,
    items,
    renderItem,
  };
}

interface State {
  handleItemsChange: (event: NonCancelableCustomEvent<BoardProps.ItemsChangeDetail<WidgetConfig>>) => void;
  i18nStrings: BoardProps.I18nStrings<WidgetConfig>;
  items: ReadonlyArray<BoardProps.Item<WidgetConfig>>;
  renderItem: (item: BoardProps.Item<WidgetConfig>, actions: BoardProps.ItemActions) => JSX.Element
}