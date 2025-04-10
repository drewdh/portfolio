import FormField, { FormFieldProps } from '@cloudscape-design/components/form-field';
import { FormikValues, getIn, useFormikContext } from 'formik';

export default function FormikFormField<T extends FormikValues>({ name, ...props }: Props) {
  const { errors } = useFormikContext<T>();

  return <FormField {...props} errorText={getIn(errors, name)} />;
}

interface Props extends Omit<FormFieldProps, 'errorText'> {
  name: string;
}
