import { FormikValues, getIn, useFormikContext } from 'formik';
import CloudscapeTextarea, { TextareaProps } from '@cloudscape-design/components/textarea';

export default function FormikTextarea<T extends FormikValues>({
  name,
  onBlur,
  onChange,
  ...props
}: Props) {
  const { values, setFieldValue, setFieldTouched, touched } = useFormikContext<T>();

  return (
    <CloudscapeTextarea
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

interface Props extends Omit<TextareaProps, 'value'> {
  name: string;
}
