import { FormikValues, getIn, useFormikContext } from 'formik';
import Select, { SelectProps } from '@cloudscape-design/components/select';

import useValidateField from 'common/formik/use-validate-field';

export default function FormikSelect<T extends FormikValues>({
  name,
  onChange,
  onBlur,
  ...props
}: Props) {
  const { values, setFieldValue, touched, setFieldTouched } = useFormikContext<T>();
  const validateField = useValidateField(name);

  return (
    <Select
      {...props}
      selectedOption={getIn(values, name)}
      onBlur={(event) => {
        setFieldTouched(name);
        validateField();
        onBlur?.(event);
      }}
      onChange={async (event) => {
        await setFieldValue(name, event.detail.selectedOption);
        if (getIn(touched, name)) {
          validateField();
        }
        onChange?.(event);
      }}
    />
  );
}

interface Props extends Omit<SelectProps, 'selectedOption'> {
  name: string;
}
