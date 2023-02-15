import { useCallback } from 'react';
import Modal from '@cloudscape-design/components/modal';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Button from '@cloudscape-design/components/button';

import { TimerType } from './types';

export function ConfirmSwitchModal({ currentTimerType, visible, onDismiss }: Props) {
  const handleDismiss = useCallback(() => onDismiss(), [onDismiss]);
  const handleConfirm = useCallback(() => onDismiss(true), [onDismiss]);

  return (
    <Modal
      header="Switch timer"
      onDismiss={handleDismiss}
      footer={
        <Box float="right">
          <SpaceBetween size="xs" direction="horizontal">
            <Button onClick={handleDismiss}>Cancel</Button>
            <Button
              variant={currentTimerType === TimerType.Pomodoro ? 'normal' : 'primary'}
              onClick={handleConfirm}
            >
              Switch
            </Button>
            {currentTimerType === TimerType.Pomodoro && (
              <Button
                onClick={handleConfirm}
                variant="primary"
              >
                Complete & switch
              </Button>
            )}
          </SpaceBetween>
        </Box>
      }
      visible={visible}
    >
      Switch timer? You already have a timer running.
    </Modal>
  );
}

interface Props {
  currentTimerType: TimerType;
  onDismiss: (isSuccess?: boolean) => void;
  visible: boolean;
}
