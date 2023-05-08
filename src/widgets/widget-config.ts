import { BoardProps } from '@cloudscape-design/board-components/board';
import { useCallback, useMemo } from 'react';

import Timer from './timer';
import { WidgetConfig, WidgetId } from './interfaces';
import useLocalStorage, { LocalStorageKey } from '../useLocalStorage';

const widgetDataMap: Record<WidgetId, WidgetConfig> = {
  [WidgetId.Timer]: {
    title: 'Pomodoro timer',
    widget: Timer,
  },
};

export const defaultLayout: ReadonlyArray<SavedBoardItem> = [
  {
    id: WidgetId.Timer,
    definition: {
      defaultRowSpan: 3,
      defaultColumnSpan: 2,
    },
  }];

type SavedBoardItem = Omit<BoardProps.Item, 'data'>;

export function useWidgetLayout(): State {
  const [savedLayout, setSavedLayout] = useLocalStorage<ReadonlyArray<SavedBoardItem>>(LocalStorageKey.DashboardLayout, defaultLayout);

  const layoutWithData = useMemo((): ReadonlyArray<BoardProps.Item<WidgetConfig>> => {
    return savedLayout.map((boardItem) => {
      return {
        ...boardItem,
        data: widgetDataMap[boardItem.id as WidgetId],
      };
    });
  }, [savedLayout]);

  const updateLayout = useCallback((newValue: ReadonlyArray<BoardProps.Item<WidgetConfig>>): void => {
    const layoutWithoutData: SavedBoardItem[] = newValue.map((item: BoardProps.Item<WidgetConfig>) => {
      const { data, ...spread } = item;
      return spread;
    });
    setSavedLayout(layoutWithoutData);
  }, [setSavedLayout]);

  return useMemo((): State => ([
    layoutWithData,
    updateLayout,
  ]), [layoutWithData, updateLayout]);
}

type State = [
  layout: ReadonlyArray<BoardProps.Item<WidgetConfig>>,
  updateLayout: (state: ReadonlyArray<BoardProps.Item<WidgetConfig>>) => void,
]
