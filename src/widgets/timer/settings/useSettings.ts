import { useCallback, useMemo, useState } from 'react';
import { NonCancelableCustomEvent } from '@cloudscape-design/components';
import { InputProps } from '@cloudscape-design/components/input';
import { ToggleProps } from '@cloudscape-design/components/toggle';
import { SelectProps } from '@cloudscape-design/components/select';
import { AlarmTone, SettingsValues } from './types';
import { getLengthInMinutes } from '../../../settings/utilities';

type InputChangeEvent = NonCancelableCustomEvent<InputProps.ChangeDetail>;
type ToggleChangeEvent = NonCancelableCustomEvent<ToggleProps.ChangeDetail>;
type SelectChangeEvent = NonCancelableCustomEvent<SelectProps.ChangeDetail>;

export default function useSettings({ onChange, onDismiss, settings: initialSettings }: Props): State {
  const [settings, setSettings] = useState<SettingsValues>(initialSettings);

  const handleSave = useCallback((): void => {
    onChange(settings);
    onDismiss();
  }, [onDismiss, onChange, settings]);

  const alarmToneOptions = useMemo((): SelectProps.Option[] => {
    return [
      { value: AlarmTone.Kitchen, label: 'Kitchen (default)' },
      { value: AlarmTone.Bell, label: 'Bell' },
      { value: AlarmTone.Bird, label: 'Bird' },
      { value: AlarmTone.Digital, label: 'Digital' },
    ];
  }, []);

  const handleDismiss = useCallback((): void => {
    setSettings(initialSettings);
    onDismiss();
  }, [onDismiss, initialSettings]);

  const selectedAlarmToneOption = useMemo((): SelectProps.Option => {
    return alarmToneOptions.find(({ value }) => value === settings.alarmTone)!;
  }, [alarmToneOptions, settings.alarmTone])

  const handleAlarmToneChange = useCallback((event: SelectChangeEvent): void => {
    const { value } = event.detail.selectedOption;
    setSettings((prevState) => ({
      ...prevState,
      alarmTone: value as AlarmTone,
    }))
  }, []);

  const handleAutoStartChange = useCallback((event: ToggleChangeEvent): void => {
    const { checked } = event.detail;
    setSettings((prevState) => ({
      ...prevState,
      hasAutoStart: checked,
    }));
  }, []);

  const handleHasAlarmSoundChange = useCallback((event: ToggleChangeEvent): void => {
    const { checked } = event.detail;
    setSettings((prevState) => ({
      ...prevState,
      hasAlarmSound: checked,
    }));
  }, []);

  const handleHasStartAndStopSoundsChange = useCallback((event: ToggleChangeEvent): void => {
    const { checked } = event.detail;
    setSettings((prevState) => ({
      ...prevState,
      hasStartAndStopSounds: checked,
    }));
  }, []);

  const handleHasTickingChange = useCallback((event: ToggleChangeEvent): void => {
    const { checked } = event.detail;
    setSettings((prevState) => ({
      ...prevState,
      hasTickingSound: checked,
    }));
  }, []);

  // TODO: Validation
  const handleLongBreakLengthChange = useCallback((event: InputChangeEvent): void => {
    const { value } = event.detail;
    setSettings((prevState) => ({
      ...prevState,
      longBreakLengthSeconds: Number(value) * 60,
    }));
  }, []);

  // TODO: Validation
  const handlePomodoroLengthChange = useCallback((event: InputChangeEvent): void => {
    const { value } = event.detail;
    setSettings((prevState) => ({
      ...prevState,
      pomodoroLengthSeconds: Number(value) * 60,
    }));
  }, []);

  // TODO: Validation
  const handleShortBreakLengthChange = useCallback((event: InputChangeEvent): void => {
    const { value } = event.detail;
    setSettings((prevState) => ({
      ...prevState,
      shortBreakLengthSeconds: Number(value) * 60,
    }));
  }, []);

  const longBreakLength = useMemo((): string => {
    return getLengthInMinutes(settings.longBreakLengthSeconds);
  }, [settings.longBreakLengthSeconds]);

  const pomodoroLength = useMemo((): string => {
    return getLengthInMinutes(settings.pomodoroLengthSeconds);
  }, [settings.pomodoroLengthSeconds]);

  const shortBreakLength = useMemo((): string => {
    return getLengthInMinutes(settings.shortBreakLengthSeconds);
  }, [settings.shortBreakLengthSeconds]);

  return {
    alarmToneOptions,
    handleAlarmToneChange,
    handleAutoStartChange,
    handleDismiss,
    handleHasAlarmSoundChange,
    handleHasStartAndStopSoundsChange,
    handleHasTickingChange,
    handleLongBreakLengthChange,
    handlePomodoroLengthChange,
    handleSave,
    handleShortBreakLengthChange,
    hasAlarmSound: settings.hasAlarmSound,
    hasAutoStart: settings.hasAutoStart,
    hasStartAndStopSounds: settings.hasStartAndStopSounds,
    hasTickingSound: settings.hasTickingSound,
    longBreakLength,
    pomodoroLength,
    selectedAlarmToneOption,
    shortBreakLength,
  };
}

interface Props {
  onChange: (settings: SettingsValues) => void;
  onDismiss: () => void;
  settings: SettingsValues;
}

interface State {
  alarmToneOptions: SelectProps.Option[];
  handleAlarmToneChange: (event: SelectChangeEvent) => void;
  handleAutoStartChange: (event: ToggleChangeEvent) => void;
  handleDismiss: () => void;
  handleHasAlarmSoundChange: (event: ToggleChangeEvent) => void;
  handleHasStartAndStopSoundsChange: (event: ToggleChangeEvent) => void;
  handleHasTickingChange: (event: ToggleChangeEvent) => void;
  handleLongBreakLengthChange: (event: InputChangeEvent) => void;
  handlePomodoroLengthChange: (event: InputChangeEvent) => void;
  handleSave: () => void;
  handleShortBreakLengthChange: (event: InputChangeEvent) => void;
  hasAlarmSound: boolean;
  hasAutoStart: boolean;
  hasStartAndStopSounds: boolean;
  hasTickingSound: boolean;
  longBreakLength: string;
  pomodoroLength: string;
  selectedAlarmToneOption: SelectProps.Option;
  shortBreakLength: string;
}
