import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import FormField from '@cloudscape-design/components/form-field';
import Input from '@cloudscape-design/components/input';
import Select from '@cloudscape-design/components/select';
import Toggle from '@cloudscape-design/components/toggle';
import Modal from '@cloudscape-design/components/modal';

import styles from './styles.module.scss';
import { useSettingsModal } from './useSettingsModal';

export function SettingsModal({ visible, onDismiss }: Props) {
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
  } = useSettingsModal({ onDismiss });

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
      visible={visible}
      onDismiss={handleDismiss}
    >
      <SpaceBetween size="l">
        <Container header={<Header variant="h3">Timers</Header>}>
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
              label="Auto-start next timer"
              description="Allows the next timer to auto-start once a timer completes."
            >
              <Toggle checked={hasAutoStart} onChange={handleAutoStartChange}>
                Auto-start next timer
              </Toggle>
            </FormField>
          </SpaceBetween>
        </Container>
        <Container header={<Header variant="h3">Sounds</Header>}>
          <SpaceBetween size="m">
            <FormField label="Alarm sound" description="Play an alarm whenever a timer completes.">
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
            <FormField label="Ticking sound">
              <Toggle checked={hasTickingSound} onChange={handleHasTickingChange}>
                Ticking sound
              </Toggle>
            </FormField>
            <FormField
              label="Feedback sounds"
              description="Play a short feedback sound when a timer starts, pauses, or stops."
            >
              <Toggle checked={hasStartAndStopSounds} onChange={handleHasStartAndStopSoundsChange}>
                Feedback sounds
              </Toggle>
            </FormField>
          </SpaceBetween>
        </Container>
      </SpaceBetween>
    </Modal>
  );
}

interface Props {
  visible: boolean;
  onDismiss: () => void;
}
