import { useCallback, useMemo, useState } from 'react';
import { NonCancelableCustomEvent } from '@cloudscape-design/components';
import { TextareaProps } from '@cloudscape-design/components/textarea';
import { RadioGroupProps } from '@cloudscape-design/components/radio-group';
import { SelectProps } from '@cloudscape-design/components/select';
import { FormikErrors, useFormik } from 'formik';
import * as Yup from 'yup';

import { sendFeedback } from './feedbackApi';
import { InputProps } from '@cloudscape-design/components/input';

enum Satisfied {
  Yes = 'yes',
  No = 'no',
}

enum Type {
  General = 'general',
  FeatureRequest = 'featureRequest',
  Issue = 'issue',
  UiFeedback = 'uiFeedback',
}

interface Values {
  email: string;
  message: string;
  satisfied: Satisfied | null;
  type: SelectProps.Option;
}

const validationSchema = Yup.object().shape({
  message: Yup.string()
    .max(1000, 'Message must be 1,000 characters or fewer.')
    .required('Enter a message.'),
  satisfied: Yup.string()
    .required('Choose a satisfaction.'),
  email: Yup.string()
    .email('Enter a valid email.')
});

export default function useFeedback({
  onDismiss,
}: Props): State {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isApiError, setIsApiError] = useState<boolean>(false);
  const typeOptions = useMemo((): SelectProps.Option[] => {
    return [
      {
        label: 'General feedback',
        value: Type.General,
      },
      {
        label: 'Feature request',
        value: Type.FeatureRequest,
      },
      {
        label: 'Report an issue',
        value: Type.Issue,
      },
      {
        label: 'UI feedback',
        value: Type.UiFeedback,
      },
    ];
  }, []);

  const {
    errors,
    handleSubmit,
    isSubmitting,
    resetForm,
    setFieldValue,
    values,
  } = useFormik<Values>({
    initialValues: {
      email: '',
      message: '',
      satisfied: null,
      type: typeOptions[0],
    },
    validateOnChange: isSubmitted,
    validationSchema,
    onSubmit: async (values, formikHelpers) => {
      setIsApiError(false);
      try {
        await sendFeedback({
          message: values.message,
          type: values.type.value!,
          satisfied: values.satisfied!,
          email: values.email,
        });
        setIsSuccess(true);
      } catch {
        setIsApiError(true);
      }
    },
  });

  const satisfiedItems = useMemo((): RadioGroupProps.RadioButtonDefinition[] => {
    return [
      {
        value: Satisfied.Yes,
        label: 'Yes',
      },
      {
        value: Satisfied.No,
        label: 'No',
      },
    ];
  }, []);

  const handleEmailChange = useCallback((event: NonCancelableCustomEvent<InputProps.ChangeDetail>): void => {
    setFieldValue('email', event.detail.value);
  }, [setFieldValue]);

  const handleTypeChange = useCallback((event: NonCancelableCustomEvent<SelectProps.ChangeDetail>): void => {
    setFieldValue('type', event.detail.selectedOption);
  }, [setFieldValue]);

  const handleMessageChange = useCallback((event: NonCancelableCustomEvent<TextareaProps.ChangeDetail>): void => {
    setFieldValue('message', event.detail.value);
  }, [setFieldValue]);

  const handleSatisfiedChange = useCallback((event: NonCancelableCustomEvent<RadioGroupProps.ChangeDetail>): void => {
    setFieldValue('satisfied', event.detail.value as Satisfied);
  }, [setFieldValue]);

  const messageConstraintText = useMemo((): string | undefined => {
    const remainingCharacters = 1000 - values.message.length;
    const characterString = remainingCharacters === 1 ? 'character' : 'characters';
    return `${remainingCharacters.toLocaleString()} ${characterString} remaining`;
  }, [values.message]);

  const handleSubmitClick = useCallback((): void => {
    setIsSubmitted(true);
    handleSubmit();
  }, [handleSubmit]);

  const handleDismiss = useCallback((): void => {
    onDismiss();
    setIsSubmitted(false);
    setIsSuccess(false);
    setIsApiError(false);
    resetForm();
  }, [onDismiss, resetForm]);

  return {
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
  };
}

interface Props {
  onDismiss: () => void;
}

interface State {
  errors: FormikErrors<Values>;
  handleDismiss: () => void;
  handleEmailChange: (event: NonCancelableCustomEvent<InputProps.ChangeDetail>) => void;
  handleMessageChange: (event: NonCancelableCustomEvent<TextareaProps.ChangeDetail>) => void;
  handleSatisfiedChange: (event: NonCancelableCustomEvent<RadioGroupProps.ChangeDetail>) => void;
  handleSubmitClick: () => void;
  handleTypeChange: (event: NonCancelableCustomEvent<SelectProps.ChangeDetail>) => void;
  isApiError: boolean;
  isSubmitting: boolean;
  isSuccess: boolean;
  messageConstraintText: string | undefined;
  satisfiedItems: RadioGroupProps.RadioButtonDefinition[];
  typeOptions: SelectProps.Options;
  values: Values;
}
