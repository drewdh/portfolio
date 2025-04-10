import { getIn, useFormikContext } from 'formik';
import RadioGroup, { RadioGroupProps } from '@cloudscape-design/components/radio-group';
import { forwardRef } from 'react';

const FormikRadioGroup = forwardRef<RadioGroupProps.Ref, Props>(
  ({ name, onChange, ...props }, ref) => {
    const { values, setFieldValue } = useFormikContext();

    return (
      <RadioGroup
        {...props}
        ref={ref}
        value={getIn(values, name)}
        onChange={(e) => {
          /*
           * Radio group component doesn't expose an onBlur, probably because guidance is to always
           * have an option selected. So we'll always validate on change, though there likely
           * won't be errors for a radio group.
           */
          setFieldValue(name, e.detail.value, true);
          onChange?.(e);
        }}
      />
    );
  }
);

export default FormikRadioGroup;

interface Props extends Omit<RadioGroupProps, 'value'> {
  name: string;
}
