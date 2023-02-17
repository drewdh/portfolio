import { useCallback } from 'react';

export enum LocalStorageKey {
  GlobalSettings = 'globalSettings',
  PomodoroSettings = 'pomodoroSettings',
  IsPreviewNotificationDismissed = 'previewNotification',
}

/** Helper functions for accessing local storage that safely stringify and parse values */
export default function useLocalStorage<T>({ defaultValue, key }: Props<T>): State<T> {
  const getItem = useCallback((): T => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : defaultValue;
    } catch {
      return defaultValue;
    }
  }, [defaultValue, key]);

  const setItem = useCallback((value: T): void => {
    try {
      const stringifiedValue = JSON.stringify(value);
      localStorage.setItem(key, stringifiedValue);
    } catch {}
  }, [key]);

  return {
    getItem,
    setItem,
  };
}

interface Props<T> {
  defaultValue: T;
  key: LocalStorageKey;
}

interface State<T> {
  getItem: () => T;
  setItem: (value: T) => void;
}
