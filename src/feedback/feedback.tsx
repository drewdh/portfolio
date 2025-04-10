import Alert from '@cloudscape-design/components/alert';
import Modal from '@cloudscape-design/components/modal';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import { FormikProvider } from 'formik';

import useFeedback from './use-feedback';
import FormikFormField from 'common/formik/form-field';
import FormikSelect from 'common/formik/select';
import FormikTextarea from 'common/formik/textarea';
import FormikRadioGroup from 'common/formik/radio-group';
import FormikInput from 'common/formik/input';

export default function Feedback({ visible, onDismiss }: Props) {
  const {
    alertRef,
    emailRef,
    formik,
    handleDismiss,
    handleSubmitClick,
    isApiError,
    isSubmitting,
    isSuccess,
    messageConstraintText,
    messageRef,
    satisfiedItems,
    satisfiedRef,
    typeOptions,
  } = useFeedback({ onDismiss });

  return (
    <FormikProvider value={formik}>
      <Modal
        footer={
          <Box float="right">
            {isSuccess && (
              <Button variant="primary" onClick={handleDismiss}>
                Close
              </Button>
            )}
            {!isSuccess && (
              <SpaceBetween size="xs" direction="horizontal">
                <Button variant="link" form="feedback" formAction="none" onClick={handleDismiss}>
                  Cancel
                </Button>
                <Button
                  loading={isSubmitting}
                  variant="primary"
                  formAction="submit"
                  form="feedback"
                  onClick={handleSubmitClick}
                >
                  Submit
                </Button>
              </SpaceBetween>
            )}
          </Box>
        }
        header={<Header>Feedback</Header>}
        onDismiss={handleDismiss}
        visible={Boolean(visible)}
      >
        <form id="feedback" onSubmit={formik.handleSubmit}>
          {isSuccess && <Alert type="success">Successfully submitted feedback.</Alert>}
          {!isSuccess && (
            <SpaceBetween size="l">
              <span>Thank you for taking time to provide feedback.</span>
              <FormikFormField label="Feedback type" name="type">
                <FormikSelect name="type" options={typeOptions} />
              </FormikFormField>
              <FormikFormField
                name="message"
                label="Message"
                constraintText={messageConstraintText}
              >
                <FormikTextarea name="message" ref={messageRef} />
              </FormikFormField>
              <FormikFormField name="satisfied" label="Are you satisfied with your experience?">
                <FormikRadioGroup name="satisfied" items={satisfiedItems} ref={satisfiedRef} />
              </FormikFormField>
              <FormikFormField
                name="email"
                label={
                  <span>
                    Email - <i>optional</i>
                  </span>
                }
                description="If you would like to be contacted about your feedback, enter your email address."
              >
                <FormikInput name="email" ref={emailRef} placeholder="person.doe@email.com" />
              </FormikFormField>
              {isApiError && (
                <Alert ref={alertRef} type="error">
                  Failed to submit feedback. Try again later.
                </Alert>
              )}
            </SpaceBetween>
          )}
        </form>
      </Modal>
    </FormikProvider>
  );
}

interface Props {
  visible: boolean | undefined;
  onDismiss: () => void;
}
