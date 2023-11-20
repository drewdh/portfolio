import { NonCancelableCustomEvent } from '@cloudscape-design/components';
import { SegmentedControlProps } from '@cloudscape-design/components/segmented-control';

export enum TimerType {
  Pomodoro = 'pomodoro',
  ShortBreak = 'shortBreak',
  LongBreak = 'longBreak',
}
export enum RunStatus {
  Running,
  Paused,
  Stopped,
}
export interface SetTimerOptions {
  disableAutoStart?: boolean;
}
export type SegmentedControlChangeEvent =
  NonCancelableCustomEvent<SegmentedControlProps.ChangeDetail>;
