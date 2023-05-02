import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';
import FormField from '@cloudscape-design/components/form-field';
import Input from '@cloudscape-design/components/input';
import Select from '@cloudscape-design/components/select';
import Toggle from '@cloudscape-design/components/toggle';

import styles from './styles.module.scss';
import useSettings from './useSettings';
import { SettingsValues } from './types';
import Modal from '@cloudscape-design/components/modal';
import Button from '@cloudscape-design/components/button';
import Header from '@cloudscape-design/components/header';

export default function SettingsModal({ onDismiss, isVisible, onChange, settings }: Props) {
  const isSoundEnabled = false;
  const {
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
    hasAlarmSound,
    hasAutoStart,
    hasStartAndStopSounds,
    hasTickingSound,
    longBreakLength,
    pomodoroLength,
    selectedAlarmToneOption,
    shortBreakLength,
  } = useSettings({ onChange, settings, onDismiss });

  return (
    <Modal
      header={
        <Header>Pomodoro timer settings</Header>
      }
      onDismiss={handleDismiss}
      visible={isVisible}
      footer={
        <Box float="right">
          <SpaceBetween size="xs" direction="horizontal">
            <Button variant="link" onClick={handleDismiss}>Cancel</Button>
            <Button variant="primary" onClick={handleSave}>Save</Button>
          </SpaceBetween>
        </Box>
      }
    >
      <SpaceBetween size="l">
        <FormField label="Pomodoro">
          <div className={styles.customInputSmall}>
            <Input
              onChange={handlePomodoroLengthChange}
              value={pomodoroLength}
              type="number"
            />
          </div>
          <Box variant="span" padding={{ left: 's' }}>
            minutes
          </Box>
        </FormField>
        <FormField label="Short break">
          <div className={styles.customInputSmall}>
            <Input
              onChange={handleShortBreakLengthChange}
              value={shortBreakLength}
              type="number"
            />
          </div>
          <Box variant="span" padding={{ left: 's' }}>
            minutes
          </Box>
        </FormField>
        <FormField label="Long break">
          <div className={styles.customInputSmall}>
            <Input
              onChange={handleLongBreakLengthChange}
              value={longBreakLength}
              type="number"
            />
          </div>
          <Box variant="span" padding={{ left: 's' }}>
            minutes
          </Box>
        </FormField>
        <FormField
          constraintText="Allows the next timer to auto-start once a timer completes."
        >
          <Toggle checked={hasAutoStart} onChange={handleAutoStartChange}>
            Auto-start next timer
          </Toggle>
        </FormField>
        {isSoundEnabled && (
          <>
            <FormField constraintText="Play an alarm whenever a timer completes.">
              <Toggle checked={hasAlarmSound} onChange={handleHasAlarmSoundChange}>
                Alarm sound
              </Toggle>
            </FormField>
            {hasAlarmSound && (
              <FormField label="Alarm tone">
                <Select
                  onChange={handleAlarmToneChange}
                  options={alarmToneOptions}
                  selectedOption={selectedAlarmToneOption}
                />
              </FormField>
            )}
            <FormField>
              <Toggle checked={hasTickingSound} onChange={handleHasTickingChange}>
                Ticking sound
              </Toggle>
            </FormField>
            <FormField
              constraintText="Play a short feedback sound when a timer starts, pauses, or stops."
            >
              <Toggle checked={hasStartAndStopSounds} onChange={handleHasStartAndStopSoundsChange}>
                Feedback sounds
              </Toggle>
            </FormField>
          </>
        )}
      </SpaceBetween>
    </Modal>
  );
}

interface Props {
  isVisible: boolean;
  onDismiss: () => void;
  onChange: (settings: SettingsValues) => void;
  settings: SettingsValues;
}
