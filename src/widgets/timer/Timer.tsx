import Button from '@cloudscape-design/components/button';
import Box from '@cloudscape-design/components/box';
import Container from '@cloudscape-design/components/container';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Form from '@cloudscape-design/components/form';
import Header from '@cloudscape-design/components/header';
import Link from '@cloudscape-design/components/link';
import SpaceBetween from '@cloudscape-design/components/space-between';
import SegmentedControl from '@cloudscape-design/components/segmented-control';
import FormField from '@cloudscape-design/components/form-field';

import useTimer from './useTimer';
import ConfirmSwitchModal from './ConfirmSwitchModal';
import Settings from './settings';
import usePreviewNotification from '../../usePreviewNotification';
import { ExpandableSection } from '@cloudscape-design/components';

export default function Timer() {
  usePreviewNotification();
  const {
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
  } = useTimer();

  return (
    <ContentLayout
      header={
        <Header
          variant="h1"
          description={
            <>
              <span>A time management tool that uses the Pomodoro Technique to help improve productivity.</span>
              {' '}<Link external href="https://wikipedia.org/wiki/Pomodoro_Technique">Learn more</Link>
            </>
          }
          actions={
            <SpaceBetween size="xs" direction="horizontal">
              <Button
                href="https://github.com/drewdh/portfolio/tree/main/src/widgets/timer"
                target="_blank"
                iconName="external"
                iconAlign="right"
              >
                Browse code
              </Button>
            </SpaceBetween>
          }
        >
          Pomodoro timer
        </Header>
      }
    >
      <Form
        actions={
          <SpaceBetween direction="horizontal" size="xs">
            <Button onClick={handleResetClick}>Reset pomodoros</Button>
            <Button onClick={handleStopClick}>Stop</Button>
            <Button onClick={handleCompleteClick}>Complete</Button>
            <Button variant="primary" onClick={handleStartClick}>
              {startButtonLabel}
            </Button>
          </SpaceBetween>
        }
      >
        <Container
          footer={
            <ExpandableSection
              headerText="Settings"
              variant="footer"
            >
              <Settings onChange={handleSettingsChange} settings={settings} />
            </ExpandableSection>
          }
          header={<Header>Timer</Header>}
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
      </Form>
      <ConfirmSwitchModal
        currentTimerType={selectedTypeId}
        onDismiss={handleConfirmModalDismiss}
        visible={isConfirmModalVisible}
      />
    </ContentLayout>
  );
}
