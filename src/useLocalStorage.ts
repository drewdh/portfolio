import { useCallback } from 'react';

export enum LocalStorageKey {
  GlobalSettings = 'GlobalSettings',
}

/** Helper functions for accessing local storage that safely stringify and parse values */
export function useLocalStorage<T>(defaultValue: T): State<T> {
  const getItem = useCallback((key: LocalStorageKey): T => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : defaultValue;
    } catch {
      return defaultValue;
    }
  }, [defaultValue]);

  const setItem = useCallback((key: LocalStorageKey, value: T): void => {
    try {
      const stringifiedValue = JSON.stringify(value);
      localStorage.setItem(key, stringifiedValue);
    } catch {}
  }, []);

  return {
    getItem,
    setItem,
  };
}

interface State<T> {
  getItem: (key: LocalStorageKey) => T;
  setItem: (key: LocalStorageKey, value: T) => void;
}
