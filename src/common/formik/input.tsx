import { FormikValues, getIn, useFormikContext } from 'formik';
import CloudscapeInput, { InputProps } from '@cloudscape-design/components/input';

export default function FormikInput<T extends FormikValues>({
  name,
  onChange,
  onBlur,
  ...props
}: Props) {
  const { values, setFieldValue, setFieldTouched, touched } = useFormikContext<T>();

  return (
    <CloudscapeInput
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

interface Props extends Omit<InputProps, 'value'> {
  name: string;
}
