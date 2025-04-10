import { FormikValues, getIn, useFormikContext } from 'formik';
import Multiselect, { MultiselectProps } from '@cloudscape-design/components/multiselect';

export default function FormikMultiselect<T extends FormikValues>({
  name,
  onChange,
  onBlur,
  ...props
}: Props) {
  const { values, setFieldValue, touched, setFieldTouched } = useFormikContext<T>();

  return (
    <Multiselect
      {...props}
      selectedOptions={getIn(values, name)}
      onBlur={(event) => {
        setFieldTouched(name);
        onBlur?.(event);
      }}
      onChange={(event) => {
        setFieldValue(name, event.detail.selectedOptions, getIn(touched, name));
        onChange?.(event);
      }}
    />
  );
}

interface Props extends Omit<MultiselectProps, 'selectedOptions'> {
  name: string;
}
