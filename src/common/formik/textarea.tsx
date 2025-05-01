import { forwardRef } from 'react';
import { getIn, useFormikContext } from 'formik';
import CloudscapeTextarea, { TextareaProps } from '@cloudscape-design/components/textarea';

import useValidateField from 'common/formik/use-validate-field';

const FormikTextarea = forwardRef<TextareaProps.Ref, Props>(
  ({ name, onBlur, onChange, ...props }, ref) => {
    const { values, setFieldValue, setFieldTouched, touched } = useFormikContext();
    const validateField = useValidateField(name);

    return (
      <CloudscapeTextarea
        {...props}
        ref={ref}
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

export default FormikTextarea;

interface Props extends Omit<TextareaProps, 'value'> {
  name: string;
}
