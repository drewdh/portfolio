import { BoardProps } from '@cloudscape-design/board-components/board';
import { useCallback, useMemo } from 'react';

import Timer from './timer';
import { WidgetConfig, WidgetId } from './interfaces';
import useLocalStorage, { LocalStorageKey } from '../useLocalStorage';

const widgetDataMap: Record<WidgetId, WidgetConfig> = {
  [WidgetId.Timer]: {
    description: 'Time management tool',
    title: 'Pomodoro timer',
    widget: Timer,
    iconName: 'status-pending',
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

  const resetLayout = useCallback((): void => {
    setSavedLayout(defaultLayout);
  }, [setSavedLayout]);

  const updateLayout = useCallback((newValue: ReadonlyArray<BoardProps.Item<WidgetConfig>>): void => {
    const layoutWithoutData: SavedBoardItem[] = newValue.map((item: BoardProps.Item<WidgetConfig>) => {
      const { data, ...spread } = item;
      return spread;
    });
    setSavedLayout(layoutWithoutData);
  }, [setSavedLayout]);

  const paletteItems = useMemo((): ReadonlyArray<BoardProps.Item<WidgetConfig>> => {
    return defaultLayout
      .filter((widget) => {
        return !savedLayout.find((visibleWidget) => visibleWidget.id === widget.id)
      })
      .map((widget) => {
        return {
          ...widget,
          data: widgetDataMap[widget.id as WidgetId],
        };
      });
  }, [savedLayout]);

  return {
    layout: layoutWithData,
    paletteItems,
    updateLayout,
    resetLayout,
  }
}

interface State {
  layout: ReadonlyArray<BoardProps.Item<WidgetConfig>>;
  paletteItems: ReadonlyArray<BoardProps.Item<WidgetConfig>>;
  updateLayout: (state: ReadonlyArray<BoardProps.Item<WidgetConfig>>) => void;
  resetLayout: () => void;
}
