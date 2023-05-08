import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export enum LocalStorageKey {
  GlobalSettings = 'globalSettings',
  PomodoroSettings = 'pomodoroSettings',
  IsPreviewNotificationDismissed = 'previewNotification',
  DashboardLayout = 'dashboardLayout',
  WidgetPanelSize = 'widgetPanelSize',
  CoffeeWeight = 'coffeeWeight',
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

  useEffect((): void => {
    try {
      const stringifiedValue = JSON.stringify(item);
      localStorage.setItem(key, stringifiedValue);
    } catch (e) {
      console.warn(`Could not save value for key ${key}:`, item, e);
    }
  }, [item, key]);

  return [item, setItem];
}

type State<T> = [
  item: T,
  setItem: Dispatch<SetStateAction<T>>,
];
