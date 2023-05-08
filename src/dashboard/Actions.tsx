import Button from '@cloudscape-design/components/button';
import Box from '@cloudscape-design/components/box';

export default function Actions({ onReset }: Props) {
  return (
    <Box textAlign="center">
      <Button onClick={onReset}>Reset to default layout</Button>
    </Box>
  )
}

interface Props {
  onReset: () => void;
}
