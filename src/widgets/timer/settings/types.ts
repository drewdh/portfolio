export enum AlarmTone {
  Bell = 'bell',
  Bird = 'bird',
  Digital = 'digital',
  Kitchen = 'kitchen',
}
export interface SettingsValues {
  alarmTone: AlarmTone;
  hasAlarmSound: boolean;
  hasAutoStart: boolean;
  hasStartAndStopSounds: boolean;
  hasTickingSound: boolean;
  longBreakLengthSeconds: number;
  pomodoroLengthSeconds: number;
  shortBreakLengthSeconds: number;
}
