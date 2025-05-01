import { FormikValues, getIn, useFormikContext } from 'formik';
import CloudscapeDatePicker, { DatePickerProps } from '@cloudscape-design/components/date-picker';

import useValidateField from 'common/formik/use-validate-field';

export default function FormikDatePicker<T extends FormikValues>({
  name,
  onChange,
  onBlur,
  ...props
}: Props) {
  const { values, setFieldTouched, setFieldValue, touched } = useFormikContext<T>();
  const validateField = useValidateField(name);

  return (
    <CloudscapeDatePicker
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

interface Props extends Omit<DatePickerProps, 'value'> {
  name: string;
}
