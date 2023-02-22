import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Button from '@cloudscape-design/components/button';
import FormField from '@cloudscape-design/components/form-field';
import Input from '@cloudscape-design/components/input';
import Select from '@cloudscape-design/components/select';
import Toggle from '@cloudscape-design/components/toggle';
import Modal from '@cloudscape-design/components/modal';

import styles from './styles.module.scss';
import useSettingsModal from './useSettingsModal';
import { SettingsValues } from './types';
import { ColumnLayout } from '@cloudscape-design/components';

export default function SettingsModal({ visible, onDismiss, onChange, settings }: Props) {
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
    handleShortBreakLengthChange,
    handleSubmit,
    hasAlarmSound,
    hasAutoStart,
    hasStartAndStopSounds,
    hasTickingSound,
    longBreakLength,
    pomodoroLength,
    selectedAlarmToneOption,
    shortBreakLength,
  } = useSettingsModal({ onDismiss, onChange, settings });

  return (
    <Modal
      header="Settings"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" onClick={handleDismiss}>Cancel</Button>
            <Button variant="primary" onClick={handleSubmit}>Save</Button>
          </SpaceBetween>
        </Box>
      }
      size={isSoundEnabled ? 'large' : 'small'}
      visible={visible}
      onDismiss={handleDismiss}
    >
      <ColumnLayout columns={isSoundEnabled ? 2 : 1} variant="text-grid">
        <SpaceBetween size="m">
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
        </SpaceBetween>
        {isSoundEnabled && (
          <SpaceBetween size="m">
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
          </SpaceBetween>
        )}
      </ColumnLayout>
    </Modal>
  );
}

interface Props {
  visible: boolean;
  onChange: (settings: SettingsValues) => void;
  onDismiss: () => void;
  settings: SettingsValues;
}
