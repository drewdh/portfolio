import { FormikValues, getIn, useFormikContext } from 'formik';
import RadioGroup, { RadioGroupProps } from '@cloudscape-design/components/radio-group';

export default function FormikRadioGroup<T extends FormikValues>({
  name,
  onChange,
  ...props
}: Props) {
  const { values, setFieldValue } = useFormikContext<T>();

  return (
    <RadioGroup
      {...props}
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

interface Props extends Omit<RadioGroupProps, 'value'> {
  name: string;
}
