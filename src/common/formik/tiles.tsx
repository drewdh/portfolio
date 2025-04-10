import { FormikValues, getIn, useFormikContext } from 'formik';
import Tiles, { TilesProps } from '@cloudscape-design/components/tiles';

export default function FormikTiles<T extends FormikValues>({ name, onChange, ...props }: Props) {
  const { values, setFieldValue } = useFormikContext<T>();

  return (
    <Tiles
      {...props}
      value={getIn(values, name)}
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

interface Props extends Omit<TilesProps, 'value'> {
  name: string;
}
