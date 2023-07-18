import Alert from '@cloudscape-design/components/alert';
import Modal from '@cloudscape-design/components/modal';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import FormField from '@cloudscape-design/components/form-field';
import Select from '@cloudscape-design/components/select';
import Textarea from '@cloudscape-design/components/textarea';
import RadioGroup from '@cloudscape-design/components/radio-group';

import useFeedback from './useFeedback';
import Input from '@cloudscape-design/components/input';

export default function Feedback({
  isVisible,
  onDismiss,
}: Props) {
  const {
    errors,
    handleDismiss,
    handleEmailChange,
    handleMessageChange,
    handleSatisfiedChange,
    handleSubmitClick,
    handleTypeChange,
    isApiError,
    isSubmitting,
    isSuccess,
    messageConstraintText,
    satisfiedItems,
    typeOptions,
    values,
  } = useFeedback({ onDismiss });

  return (
    <Modal
      footer={
        <Box float="right">
          {isSuccess && (
            <Button variant="primary" onClick={handleDismiss}>Close</Button>
          )}
          {!isSuccess && (
            <SpaceBetween size="xs" direction="horizontal">
              <Button variant="link" onClick={handleDismiss}>
                Cancel
              </Button>
              <Button loading={isSubmitting} variant="primary" onClick={handleSubmitClick}>
                Submit
              </Button>
            </SpaceBetween>
          )}
        </Box>
      }
      header={<Header>Feedback</Header>}
      onDismiss={handleDismiss}
      visible={isVisible}
    >
      {isSuccess && (
        <Alert type="success">
          Successfully submitted feedback.
        </Alert>
      )}
      {!isSuccess && (
        <SpaceBetween size="l">
          <span>Thank you for taking time to provide feedback.</span>
          <FormField label="Feedback type">
            <Select selectedOption={values.type} onChange={handleTypeChange} options={typeOptions} />
          </FormField>
          <FormField label="Message" constraintText={messageConstraintText} errorText={errors.message}>
            <Textarea value={values.message} onChange={handleMessageChange} />
          </FormField>
          <FormField label="Are you satisfied with your experience?" errorText={errors.satisfied}>
            <RadioGroup
              items={satisfiedItems}
              onChange={handleSatisfiedChange}
              value={values.satisfied}
            />
          </FormField>
          <FormField
            errorText={errors.email}
            label={<span>Email - <i>optional</i></span>}
            description="If you would like to be contacted about your feedback, enter your email address."
          >
            <Input placeholder="person.doe@email.com" value={values.email} onChange={handleEmailChange} />
          </FormField>
          {isApiError && (
            <Alert type="error">
              Failed to submit feedback.
            </Alert>
          )}
        </SpaceBetween>
      )}
    </Modal>
  );
}

interface Props {
  isVisible: boolean;
  onDismiss: () => void;
}
