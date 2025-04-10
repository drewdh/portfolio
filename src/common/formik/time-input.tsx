import { FormikValues, getIn, useFormikContext } from 'formik';
import CloudscapeTimeInput, { TimeInputProps } from '@cloudscape-design/components/time-input';

export default function FormikTimeInput<T extends FormikValues>({
  name,
  onChange,
  onBlur,
  ...props
}: Props) {
  const { values, setFieldValue, setFieldTouched, touched } = useFormikContext<T>();

  return (
    <CloudscapeTimeInput
      {...props}
      value={getIn(values, name)}
      onBlur={(e) => {
        setFieldTouched(name);
        onBlur?.(e);
      }}
      onChange={(e) => {
        setFieldValue(name, e.detail.value, getIn(touched, name));
        onChange?.(e);
      }}
    />
  );
}

interface Props extends Omit<TimeInputProps, 'value'> {
  name: string;
}
