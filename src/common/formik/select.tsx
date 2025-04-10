import { FormikValues, getIn, useFormikContext } from 'formik';
import Select, { SelectProps } from '@cloudscape-design/components/select';

export default function FormikSelect<T extends FormikValues>({
  name,
  onChange,
  onBlur,
  ...props
}: Props) {
  const { values, setFieldValue, touched, setFieldTouched } = useFormikContext<T>();

  return (
    <Select
      {...props}
      selectedOption={getIn(values, name)}
      onBlur={(event) => {
        setFieldTouched(name);
        onBlur?.(event);
      }}
      onChange={(event) => {
        setFieldValue(name, event.detail.selectedOption, getIn(touched, name));
        onChange?.(event);
      }}
    />
  );
}

interface Props extends Omit<SelectProps, 'selectedOption'> {
  name: string;
}
