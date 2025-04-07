import { useFormikContext } from 'formik';
import Tiles, { TilesProps } from '@cloudscape-design/components/tiles';

export default function FormikTiles({ name, onChange, ...props }: Props) {
  const { values, setFieldValue } = useFormikContext<any>();
  return (
    <Tiles
      {...props}
      value={values[name]}
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
