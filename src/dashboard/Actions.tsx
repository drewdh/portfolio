import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';

export default function Actions({ onAdd, onReset }: Props) {
  return (
    <SpaceBetween direction="horizontal" size="xs">
      <Button onClick={onReset}>Reset to default layout</Button>
      <Button onClick={onAdd} iconName="add-plus">
        Add widget
      </Button>
    </SpaceBetween>
  );
}

interface Props {
  onAdd: () => void;
  onReset: () => void;
}
