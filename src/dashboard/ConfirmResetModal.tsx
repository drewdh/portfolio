import Modal from '@cloudscape-design/components/modal';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Button from '@cloudscape-design/components/button';
import Header from '@cloudscape-design/components/header';

export default function ConfirmResetModal({
  isVisible,
  onConfirm,
  onDismiss,
}: Props) {
  return (
    <Modal
      header={<Header>Reset to default layout</Header>}
      footer={
        <Box float="right">
          <SpaceBetween size="xs" direction="horizontal">
            <Button onClick={onDismiss}>Cancel</Button>
            <Button variant="primary" onClick={onConfirm}>
              Reset
            </Button>
          </SpaceBetween>
        </Box>
      }
      onDismiss={onDismiss}
      visible={isVisible}
    >
      You will lose your customizations when you reset the layout.
    </Modal>
  );
}

interface Props {
  isVisible: boolean;
  onConfirm: () => void;
  onDismiss: () => void;
}
