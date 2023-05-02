import Button from '@cloudscape-design/components/button';
import Box from '@cloudscape-design/components/box';
import Container from '@cloudscape-design/components/container';
import ContentLayout from '@cloudscape-design/components/content-layout';
import ExpandableSection from '@cloudscape-design/components/expandable-section';
import Form from '@cloudscape-design/components/form';
import Header from '@cloudscape-design/components/header';
import Link from '@cloudscape-design/components/link';
import SpaceBetween from '@cloudscape-design/components/space-between';
import SegmentedControl from '@cloudscape-design/components/segmented-control';
import FormField from '@cloudscape-design/components/form-field';

import useTimer from './useTimer';
import ConfirmSwitchModal from './ConfirmSwitchModal';
import Settings from './settings';
import { ColumnLayout } from '@cloudscape-design/components';
import BoardItem, { BoardItemProps } from '@cloudscape-design/board-components/board-item';
import ButtonDropdown from '@cloudscape-design/components/button-dropdown';
import SettingsModal from './settings';

const i18nStrings: BoardItemProps.I18nStrings = {
  dragHandleAriaLabel: 'Drag handle',
  dragHandleAriaDescription:
    'Use Space or Enter to activate drag, arrow keys to move, Space or Enter to submit, or Escape to discard.',
  resizeHandleAriaLabel: "Resize handle",
  resizeHandleAriaDescription:
    'Use Space or Enter to activate resize, arrow keys to move, Space or Enter to submit, or Escape to discard.'
};

export default function Timer({ onRemove }: Props) {
  const {
    handleCompleteClick,
    handleConfirmModalDismiss,
    handleResetClick,
    handleSettingsChange,
    handleSettingsClick,
    handleSettingsModalDismiss,
    handleStartClick,
    handleStopClick,
    handleTypeChange,
    isConfirmModalVisible,
    isSettingsModalVisible,
    pomodorosCompleted,
    selectedTypeId,
    settings,
    startButtonLabel,
    timerDisplay,
    typeOptions,
  } = useTimer();

  const actions = [
    { text: 'Complete', onClick: handleCompleteClick },
    { text: 'Stop', onClick: handleStopClick },
    { text: 'Reset pomodoros', onClick: handleResetClick },
    { text: 'Edit settings', onClick: handleSettingsClick },
    // TODO: Add once board palette is implemented
    // { text: 'Remove', onClick: onRemove }
  ];

  return (
    <>
      <BoardItem
        header={
          <Header
            actions={
              <SpaceBetween size="xs" direction="horizontal">
                <Button onClick={handleStartClick}>{startButtonLabel}</Button>
              </SpaceBetween>
            }
            // TODO: Move to help panel
            // info={<Link variant="info">Info</Link>}
            // description={
            //   <>
            //     <span>A time management tool that uses the Pomodoro Technique to help improve productivity.</span>
            //     {' '}<Link external href="https://wikipedia.org/wiki/Pomodoro_Technique">Learn more</Link>
            //   </>
            // }
            variant="h2"
          >
            Pomodoro timer
          </Header>
        }
        i18nStrings={i18nStrings}
        settings={
          <ButtonDropdown
            ariaLabel="Widget settings"
            items={actions.map((action) => {
              return {
                ...action,
                id: action.text,
              };
            })}
            onItemClick={(event) => {
              const { id } = event.detail;
              const matchingAction = actions.find((action) => action.text === id)!;
              matchingAction.onClick();
            }}
            variant="icon"
          />
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
          <ColumnLayout columns={2}>
            <div>
              <Box variant="awsui-key-label">Time remaining</Box>
              <Box fontSize="display-l" fontWeight="bold">
                {timerDisplay}
              </Box>
            </div>
            <div>
              <Box variant="awsui-key-label">Pomodoros completed</Box>
              <Box fontSize="display-l" fontWeight="bold">
                {pomodorosCompleted}
              </Box>
            </div>
          </ColumnLayout>
        </SpaceBetween>
      </BoardItem>
      <ConfirmSwitchModal
        currentTimerType={selectedTypeId}
        onDismiss={handleConfirmModalDismiss}
        visible={isConfirmModalVisible}
      />
      <SettingsModal
        isVisible={isSettingsModalVisible}
        onDismiss={handleSettingsModalDismiss}
        onChange={handleSettingsChange}
        settings={settings}
      />
    </>
  );
}

interface Props {
  onRemove: () => void;
}
