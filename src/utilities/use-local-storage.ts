import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';

export enum LocalStorageKey {
  GlobalSettings = 'globalSettings',
  PomodoroSettings = 'pomodoroSettings',
  IsPreviewNotificationDismissed = 'previewNotification',
  DashboardLayout = 'dashboardLayout',
  WidgetPanelSize = 'widgetPanelSize',
  CoffeeWeight = 'coffeeWeight',
  DiabloWorldTier = 'diabloWorldTier',
  DiabloPlayerLevel = 'diabloPlayerLevel',
  DiabloSigilTier = 'diabloSigilTier',
  DiabloMonsterLevelOffset = 'diabloMonsterLevelOffset',
  ContentDensity = 'contentDensity',
  VisualMode = 'visualMode',
  IsNewVisitor = 'isNewVisitor',
  BjWinnings = 'bjWinnings',
  BjLowWater = 'bjLowWater',
  BjHighWater = 'bjHighWater',
  BjPlayerWins = 'bjPlayerWins',
  BjDealerWins = 'bjDealerWins',
  BjHandsPlayed = 'bjHandsPlayed',
  OwGames = 'owGames',
}

/** Helper functions for accessing local storage that safely stringify and parse values */
export default function useLocalStorage<T>(key: LocalStorageKey, defaultValue: T): State<T> {
  const [item, setItem] = useState<T>(() => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  // Store the latest state in a ref to keep updateItem stable without stale values
  const itemRef = useRef(item);
  itemRef.current = item;

  const updateItem = useCallback(
    (updater: T | ((prevValue: T) => T)): void => {
      const newValue =
        typeof updater === 'function' ? (updater as Function)(itemRef.current) : updater;
      try {
        const stringifiedValue = JSON.stringify(newValue);
        localStorage.setItem(key, stringifiedValue);
        setItem(newValue);
      } catch (e) {
        console.warn(`Could not save value for key ${key}:`, itemRef.current, e);
      }
    },
    [key]
  );

  return [item, updateItem];
}

type State<T> = [item: T, setItem: Dispatch<SetStateAction<T>>];
