import { FormikValues, getIn, useFormikContext } from 'formik';
import Tiles, { TilesProps } from '@cloudscape-design/components/tiles';

export default function FormikTiles<T extends FormikValues>({ name, onChange, ...props }: Props) {
  const { values, setFieldValue } = useFormikContext<T>();

  return (
    <Tiles
      {...props}
      value={getIn(values, name)}
      onChange={(e) => {
        setFieldValue(name, e.detail.value);
        onChange?.(e);
      }}
    />
  );
}

interface Props extends Omit<TilesProps, 'value'> {
  name: string;
}
