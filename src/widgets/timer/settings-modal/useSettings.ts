import { useCallback, useContext } from 'react';

import { SettingsContext } from './SettingsContext';
import { SettingsValues } from './types';

export function useSettings(): State {
  const settingsContext = useContext(SettingsContext);

  const updateSettings = useCallback((values: SettingsValues): void => {
    settingsContext.updateValues(values);
  }, [settingsContext]);

  return {
    updateSettings,
    settings: settingsContext.values,
  };
}

interface State {
  settings: SettingsValues;
  updateSettings: (settings: SettingsValues) => void;
}