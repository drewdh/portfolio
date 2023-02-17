import { AlarmTone, SettingsValues } from './types';

export const defaultSettings: SettingsValues = {
  alarmTone: AlarmTone.Kitchen,
  hasAutoStart: false,
  hasAlarmSound: true,
  hasStartAndStopSounds: true,
  hasTickingSound: false,
  longBreakLengthSeconds: 15 * 60,
  pomodoroLengthSeconds: 25 * 60,
  shortBreakLengthSeconds: 5 * 60,
};
