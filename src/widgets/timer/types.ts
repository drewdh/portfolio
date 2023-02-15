import { NonCancelableCustomEvent } from '@cloudscape-design/components';
import { SegmentedControlProps } from '@cloudscape-design/components/segmented-control';
import { ButtonDropdownProps } from '@cloudscape-design/components/button-dropdown';

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
export enum ActionItem {
  ResetPomodoroCount = 'reset',
  Complete = 'complete',
  Restart = 'restart',
}
export interface SetTimerOptions {
  disableAutoStart?: boolean;
}
export enum DismissAction {

}
export type SegmentedControlChangeEvent = NonCancelableCustomEvent<SegmentedControlProps.ChangeDetail>;
export type ButtonDropdownItemClickEvent = NonCancelableCustomEvent<ButtonDropdownProps.ItemClickDetails>;
