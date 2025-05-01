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
          setFieldValue(name, e.detail.value);
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
