import { useCallback, useEffect, useMemo, useState } from 'react';
import { SegmentedControlProps } from '@cloudscape-design/components/segmented-control';
import { NonCancelableCustomEvent } from '@cloudscape-design/components';

import { RunStatus, SegmentedControlChangeEvent, SetTimerOptions, TimerType } from './types';
import useTitle from '../../useTitle';
import { SettingsValues } from './settings';
import useLocalStorage, { LocalStorageKey } from '../../useLocalStorage';
import { defaultSettings } from './settings';

export default function useTimer(): State {
  const { getItem: getSavedSettings, setItem: saveSettings } = useLocalStorage<SettingsValues>({
    defaultValue: defaultSettings,
    key: LocalStorageKey.PomodoroSettings,
  });
  const initialSettings = useMemo((): SettingsValues => {
    return getSavedSettings();
  }, [getSavedSettings]);
  const [settings, setSettings] = useState<SettingsValues>(initialSettings);
  const [pomodorosCompletedCount, setPomodorosCompletedCount] = useState<number>(0);
  const [selectedTypeId, setSelectedTypeId] = useState<TimerType>(TimerType.Pomodoro);
  const [runStatus, setRunStatus] = useState<RunStatus>(RunStatus.Stopped);
  const [nextTypeId, setNextTypeId] = useState<TimerType>();
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState<boolean>(false);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timer>();
  // TODO: Find audio to use
  const [tickAudio] = useState(new Audio(''));
  const [buttonPressAudio] = useState(new Audio(''));

  useEffect((): void => {
    tickAudio.loop = true;
  }, [tickAudio])

  const startButtonLabel = useMemo((): string => {
    if (runStatus === RunStatus.Running) {
      return 'Pause';
    }
    if (runStatus === RunStatus.Paused) {
      return 'Resume';
    }
    return 'Start';
  }, [runStatus]);

  const getPreferredTimerLengthInSeconds = useCallback((type: TimerType): number => {
    if (type === TimerType.Pomodoro) {
      return settings.pomodoroLengthSeconds;
    } else if (type === TimerType.ShortBreak) {
      return settings.shortBreakLengthSeconds;
    } else if (type === TimerType.LongBreak) {
      return settings.longBreakLengthSeconds;
    }
    return 0;
  }, [settings]);

  const [secondsRemaining, setSecondsRemaining] = useState<number>(getPreferredTimerLengthInSeconds(selectedTypeId));

  // Update current time remaining if changed and not running
  useEffect((): void => {
    if (runStatus !== RunStatus.Stopped) {
      return;
    }
    setSecondsRemaining(getPreferredTimerLengthInSeconds(selectedTypeId));
  }, [settings, runStatus, getPreferredTimerLengthInSeconds, selectedTypeId]);

  const interval = useCallback((): void => {
    setSecondsRemaining((prevState) => prevState - 1);
  }, []);

  useEffect((): void => {
    tickAudio.muted = !settings.hasTickingSound;
  }, [settings.hasTickingSound, tickAudio]);

  const startTickSound = useCallback((): void => {
    tickAudio.currentTime = 0;
    tickAudio.play();
  }, [tickAudio]);

  const start = useCallback((): void => {
    setSecondsRemaining((prev) => prev - 1);
    setTimerInterval(setInterval(interval, 1000));
    setRunStatus(RunStatus.Running);
    startTickSound();
  }, [interval, startTickSound]);

  const setTimer = useCallback((type: TimerType, opts: SetTimerOptions = {}): void => {
    setSelectedTypeId(type);
    clearInterval(timerInterval);
    setSecondsRemaining(getPreferredTimerLengthInSeconds(type));
    setRunStatus(RunStatus.Stopped);
    tickAudio.pause();
    const hasAutoStart = !opts.disableAutoStart && settings.hasAutoStart;
    if (hasAutoStart) {
      start();
    }
  }, [timerInterval, getPreferredTimerLengthInSeconds, settings, start, tickAudio]);

  const completeTimer = useCallback((): void => {
    if (selectedTypeId === TimerType.Pomodoro) {
      setPomodorosCompletedCount((prevState) => prevState + 1);
      const isLongBreak = (pomodorosCompletedCount + 1) % 4 === 0;
      const nextType = isLongBreak ? TimerType.LongBreak : TimerType.ShortBreak;
      setTimer(nextType);
      return;
    }
    setTimer(TimerType.Pomodoro);
  }, [selectedTypeId, setTimer, pomodorosCompletedCount]);

  // TODO: Add alarm sound
  // Handle end of timer
  useEffect((): void => {
    if (secondsRemaining >= 0) {
      return;
    }
    completeTimer();
  }, [secondsRemaining, completeTimer]);

  const pause = useCallback((): void => {
    clearInterval(timerInterval);
    setRunStatus(RunStatus.Paused);
    tickAudio.pause();
  }, [timerInterval, tickAudio]);

  const handleStartClick = useCallback((): void => {
    if (settings.hasStartAndStopSounds) {
      buttonPressAudio.play();
    }
    runStatus === RunStatus.Running ? pause() : start();
  }, [settings.hasStartAndStopSounds, runStatus, pause, start, buttonPressAudio]);

  const handleConfirmModalDismiss = useCallback((isContinue?: boolean): void => {
    if (isContinue) {
      setTimer(nextTypeId!, { disableAutoStart: true });
    }
    setIsConfirmModalVisible(false);
    setNextTypeId(undefined);
  }, [setTimer, nextTypeId]);

  const timerDisplay = useMemo((): string => {
    // Prevent flicker of negative time once timer ends
    const cappedSecondsRemaining = Math.max(secondsRemaining, 0);
    const minutes = Math.floor(cappedSecondsRemaining / 60);
    const seconds = String(cappedSecondsRemaining % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  }, [secondsRemaining]);

  useTitle(timerDisplay);

  const typeOptions = useMemo((): SegmentedControlProps.Option[] => {
    return [
      { text: 'Pomodoro', id: TimerType.Pomodoro },
      { text: 'Short break', id: TimerType.ShortBreak },
      { text: 'Long break', id: TimerType.LongBreak },
    ]
  }, []);

  const handleTypeChange = useCallback((event: NonCancelableCustomEvent<SegmentedControlProps.ChangeDetail>): void => {
    const newTypeId = event.detail.selectedId as TimerType;
    if (runStatus === RunStatus.Running) {
      setNextTypeId(newTypeId);
      setIsConfirmModalVisible(true);
      return;
    }
    setTimer(newTypeId, { disableAutoStart: true });
  }, [setTimer, runStatus]);

  const handleCompleteClick = useCallback((): void => {
    completeTimer();
  }, [completeTimer]);

  const handleResetClick = useCallback((): void => {
    setPomodorosCompletedCount(0);
  }, []);

  const handleStopClick = useCallback((): void => {
    setTimer(selectedTypeId, { disableAutoStart: true });
  }, [setTimer, selectedTypeId]);

  const pomodorosCompleted = useMemo((): string => {
    return Number(pomodorosCompletedCount).toLocaleString();
  }, [pomodorosCompletedCount]);

  const handleSettingsChange = useCallback((newSettings: SettingsValues): void => {
    setSettings(newSettings);
    saveSettings(newSettings);
  }, [saveSettings]);

  return {
    handleCompleteClick,
    handleConfirmModalDismiss,
    handleResetClick,
    handleSettingsChange,
    handleStartClick,
    handleStopClick,
    handleTypeChange,
    isConfirmModalVisible,
    pomodorosCompleted,
    selectedTypeId,
    settings,
    startButtonLabel,
    timerDisplay,
    typeOptions,
  };
}

interface State {
  handleCompleteClick: () => void;
  handleConfirmModalDismiss: (isContinue?: boolean) => void;
  handleResetClick: () => void;
  handleSettingsChange: (settings: SettingsValues) => void;
  handleStartClick: () => void;
  handleStopClick: () => void;
  handleTypeChange: (event: SegmentedControlChangeEvent) => void;
  isConfirmModalVisible: boolean;
  pomodorosCompleted: string;
  selectedTypeId: TimerType;
  settings: SettingsValues;
  startButtonLabel: string;
  timerDisplay: string;
  typeOptions: SegmentedControlProps.Option[];
}
