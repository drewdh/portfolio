import { forwardRef } from 'react';
import { getIn, useFormikContext } from 'formik';
import CloudscapeTextarea, { TextareaProps } from '@cloudscape-design/components/textarea';

const FormikTextarea = forwardRef<TextareaProps.Ref, Props>(
  ({ name, onBlur, onChange, ...props }, ref) => {
    const { values, setFieldValue, setFieldTouched, touched } = useFormikContext();

    return (
      <CloudscapeTextarea
        {...props}
        ref={ref}
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

export default FormikTextarea;

interface Props extends Omit<TextareaProps, 'value'> {
  name: string;
}
