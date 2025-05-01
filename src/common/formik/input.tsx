import { getIn, useFormikContext } from 'formik';
import CloudscapeInput, { InputProps } from '@cloudscape-design/components/input';
import { forwardRef } from 'react';

import useValidateField from 'common/formik/use-validate-field';

const FormikInput = forwardRef<InputProps.Ref, Props>(
  ({ name, onChange, onBlur, ...props }, ref) => {
    const { values, setFieldValue, setFieldTouched, touched } = useFormikContext();
    const validateField = useValidateField(name);

    return (
      <CloudscapeInput
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
);

export default FormikInput;

interface Props extends Omit<InputProps, 'value'> {
  name: string;
}
