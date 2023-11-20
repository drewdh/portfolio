import Button from '@cloudscape-design/components/button';
import Box from '@cloudscape-design/components/box';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import SegmentedControl from '@cloudscape-design/components/segmented-control';
import FormField from '@cloudscape-design/components/form-field';
import BoardItem from '@cloudscape-design/board-components/board-item';
import ButtonDropdown from '@cloudscape-design/components/button-dropdown';

import useTimer from './useTimer';
import ConfirmSwitchModal from './ConfirmSwitchModal';
import SettingsModal from './settings';
import { boardItemI18nStrings } from '../../i18n-strings';
import InfoLink from '../../common/info-link';
import HelpPanelContent from './HelpPanelContent';

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
    { text: 'Remove', onClick: onRemove },
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
            info={<InfoLink content={<HelpPanelContent />} />}
            variant="h2"
          >
            Pomodoro timer
          </Header>
        }
        i18nStrings={boardItemI18nStrings}
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
              const matchingAction = actions.find(
                (action) => action.text === id
              )!;
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
              <Box variant="awsui-value-large">{timerDisplay}</Box>
            </div>
            <div>
              <Box variant="awsui-key-label">Pomodoros completed</Box>
              <Box variant="awsui-value-large">{pomodorosCompleted}</Box>
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
