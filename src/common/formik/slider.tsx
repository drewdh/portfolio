import { FormikValues, getIn, useFormikContext } from 'formik';
import Slider, { SliderProps } from '@cloudscape-design/components/slider';

export default function FormikSlider<T extends FormikValues>({ name, onChange, ...props }: Props) {
  const { values, setFieldValue } = useFormikContext<T>();

  return (
    <Slider
      {...props}
      value={getIn(values, name)}
      onChange={(e) => {
        setFieldValue(name, e.detail.value);
        onChange?.(e);
      }}
    />
  );
}

interface Props extends Omit<SliderProps, 'value'> {
  name: string;
}
