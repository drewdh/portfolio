import { FormikValues, getIn, useFormikContext } from 'formik';
import CloudscapeTimeInput, { TimeInputProps } from '@cloudscape-design/components/time-input';

import useValidateField from 'common/formik/use-validate-field';

export default function FormikTimeInput<T extends FormikValues>({
  name,
  onChange,
  onBlur,
  ...props
}: Props) {
  const { values, setFieldValue, setFieldTouched, touched } = useFormikContext<T>();
  const validateField = useValidateField(name);

  return (
    <CloudscapeTimeInput
      {...props}
      value={getIn(values, name)}
      onBlur={(e) => {
        setFieldTouched(name);
        validateField();
        onBlur?.(e);
      }}
      onChange={async (e) => {
        await setFieldValue(name, e.detail.value);
        if (getIn(touched, name)) {
          validateField();
        }
        onChange?.(e);
      }}
    />
  );
}

interface Props extends Omit<TimeInputProps, 'value'> {
  name: string;
}
