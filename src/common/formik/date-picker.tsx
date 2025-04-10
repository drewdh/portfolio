import { FormikValues, getIn, useFormikContext } from 'formik';
import CloudscapeDatePicker, { DatePickerProps } from '@cloudscape-design/components/date-picker';

export default function FormikDatePicker<T extends FormikValues>({
  name,
  onChange,
  onBlur,
  ...props
}: Props) {
  const { values, setFieldTouched, setFieldValue, touched } = useFormikContext<T>();

  return (
    <CloudscapeDatePicker
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

interface Props extends Omit<DatePickerProps, 'value'> {
  name: string;
}
