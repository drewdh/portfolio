import Button from '@cloudscape-design/components/button';
import Box from '@cloudscape-design/components/box';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import SegmentedControl from '@cloudscape-design/components/segmented-control';
import FormField from '@cloudscape-design/components/form-field';

import { useTimer } from './useTimer';
import { ConfirmSwitchModal } from './ConfirmSwitchModal';
import { ContentLayout, Link } from '@cloudscape-design/components';
import { SettingsModal } from './settings-modal/SettingsModal';
import { usePreviewNotification } from '../../usePreviewNotification';

export function Timer() {
  usePreviewNotification();
  const {
    handleCompleteClick,
    handleConfirmModalDismiss,
    handleResetClick,
    handleSettingsClick,
    handleSettingsModalDismiss,
    handleStartClick,
    handleStopClick,
    handleTypeChange,
    isConfirmModalVisible,
    isSettingsModalVisible,
    pomodorosCompleted,
    selectedTypeId,
    startButtonLabel,
    timerDisplay,
    typeOptions,
  } = useTimer();

  return (
    <ContentLayout
      header={
        <Header
          description={
            <>
              <span>A time management tool that uses the Pomodoro Technique to help improve productivity.</span>
              {' '}<Link external href="https://wikipedia.org/wiki/Pomodoro_Technique">Learn more</Link>
            </>
          }
          actions={
            <SpaceBetween size="xs" direction="horizontal">
              <Button
                target="_blank"
                iconName="external"
                iconAlign="right"
              >
                Browse code
              </Button>
            </SpaceBetween>
          }
          variant="h1"
        >
          Pomodoro timer
        </Header>
      }
    >
      <Container
        header={
          <Header
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button onClick={handleSettingsClick}>Settings</Button>
                <Button onClick={handleResetClick}>Reset pomodoros</Button>
                <Button onClick={handleStopClick}>Stop</Button>
                <Button onClick={handleCompleteClick}>Complete</Button>
                <Button variant="primary" onClick={handleStartClick}>
                  {startButtonLabel}
                </Button>
              </SpaceBetween>
            }
          >
            Timer
          </Header>
        }
      >
        <SpaceBetween size="l">
          <FormField label="Type">
            <SegmentedControl
              selectedId={selectedTypeId}
              onChange={handleTypeChange}
              options={typeOptions}
            />
          </FormField>
          <div>
            <Box variant="awsui-key-label">Time remaining</Box>
            <Box fontSize="display-l" fontWeight="bold">
              {timerDisplay}
            </Box>
          </div>
          <div>
            <Box variant="awsui-key-label">Pomodoros completed</Box>
            <Box fontSize="heading-l" fontWeight="bold">
              {pomodorosCompleted}
            </Box>
          </div>
        </SpaceBetween>
      </Container>
      <ConfirmSwitchModal
        currentTimerType={selectedTypeId}
        onDismiss={handleConfirmModalDismiss}
        visible={isConfirmModalVisible}
      />
      <SettingsModal visible={isSettingsModalVisible} onDismiss={handleSettingsModalDismiss} />
    </ContentLayout>
  );
}
