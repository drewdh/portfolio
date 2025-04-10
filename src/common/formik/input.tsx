import { getIn, useFormikContext } from 'formik';
import CloudscapeInput, { InputProps } from '@cloudscape-design/components/input';
import { forwardRef } from 'react';

const FormikInput = forwardRef<InputProps.Ref, Props>(
  ({ name, onChange, onBlur, ...props }, ref) => {
    const { values, setFieldValue, setFieldTouched, touched } = useFormikContext();

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
);

export default FormikInput;

interface Props extends Omit<InputProps, 'value'> {
  name: string;
}
