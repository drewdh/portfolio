import { createContext } from 'react';
import { AlarmTone, SettingsValues } from './types';

export class SettingsClient {
  values: SettingsValues;
  private static readonly storageKey = 'settings';
  private static readonly defaultValues: SettingsValues = {
    alarmTone: AlarmTone.Kitchen,
    hasAutoStart: false,
    hasAlarmSound: true,
    hasStartAndStopSounds: true,
    hasTickingSound: false,
    longBreakLengthSeconds: 15 * 60,
    pomodoroLengthSeconds: 25 * 60,
    shortBreakLengthSeconds: 5 * 60,
  };

  constructor() {
    this.values = SettingsClient.getInitialValues();
  }

  updateValues(values: SettingsValues) {
    this.values = values;
    const stringifiedValues = JSON.stringify(values);
    localStorage.setItem(SettingsClient.storageKey, stringifiedValues);
  }

  private static getInitialValues() {
    try {
      const savedValues = localStorage.getItem(SettingsClient.storageKey);
      if (!savedValues) {
        return SettingsClient.defaultValues;
      }
      const parsedSettings = JSON.parse(savedValues);
      return {
        ...SettingsClient.defaultValues,
        ...parsedSettings,
      };
    } catch {
      return SettingsClient.defaultValues;
    }
  }
}

const defaultSettings = new SettingsClient();
export const SettingsContext = createContext<SettingsClient>(defaultSettings);