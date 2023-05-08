import SpaceBetween from '@cloudscape-design/components/space-between';
import Button from '@cloudscape-design/components/button';

export default function Actions({ onReset }: Props) {
  return (
    <SpaceBetween direction="horizontal" size="xs">
      <Button onClick={onReset}>Reset to default layout</Button>
      {/*<Button iconName="add-plus">Add widget</Button>*/}
    </SpaceBetween>
  )
}

interface Props {
  onReset: () => void;
}
