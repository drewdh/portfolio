import { FormikValues, useFormikContext } from 'formik';
import Slider, { SliderProps } from '@cloudscape-design/components/slider';

export default function FormikSlider<T extends FormikValues>({ name, onChange, ...props }: Props) {
  const { values, setFieldValue } = useFormikContext<T>();

  return (
    <Slider
      {...props}
      value={values[name]}
      onChange={(e) => {
        /*
         * Tiles component doesn't expose an onBlur, probably because guidance is to always
         * have an option selected. So we'll always validate on change, though there likely
         * won't be errors for tiles.
         */
        setFieldValue(name, e.detail.value, true);
        onChange?.(e);
      }}
    />
  );
}

interface Props extends Omit<SliderProps, 'value'> {
  name: string;
}
