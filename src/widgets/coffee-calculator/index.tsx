import BoardItem from '@cloudscape-design/board-components/board-item';
import SpaceBetween from '@cloudscape-design/components/space-between';
import FormField from '@cloudscape-design/components/form-field';
import Input from '@cloudscape-design/components/input';
import Header from '@cloudscape-design/components/header';
import ButtonDropdown from '@cloudscape-design/components/button-dropdown';
import Box from '@cloudscape-design/components/box';

import { boardItemI18nStrings } from '../../i18n-strings';
import useCoffeeCalculator from './useCoffeeCalculator';

export default function CoffeeCalculator({ onRemove }: Props) {
  const settingsActions = [
    { text: 'Remove', onClick: onRemove },
  ];
  const {
    coffeeWeight,
    handleCoffeeWeightChange,
    waterWeight,
  } = useCoffeeCalculator();
  return (
    <BoardItem
      header={
        <Header>
          Coffee calculator
        </Header>}
      i18nStrings={boardItemI18nStrings}
      settings={
        <ButtonDropdown
          items={settingsActions.map((action) => ({ id: action.text, text: action.text }))}
          variant="icon"
          onItemClick={(event) => {
            const { id } = event.detail;
            settingsActions.find((action) => action.text === id)?.onClick();
          }}
        />
      }
    >
      <SpaceBetween size="l">
        <FormField label="Coffee weight (grams)">
          <Input
            value={coffeeWeight}
            onChange={handleCoffeeWeightChange}
            type="number"
            inputMode="decimal"
          />
        </FormField>
        <div>
          <Box variant="awsui-key-label">
            Water weight (grams)
          </Box>
          <Box variant="awsui-value-large">
            {waterWeight}
          </Box>
        </div>
      </SpaceBetween>
    </BoardItem>
  );
}

interface Props {
  onRemove: () => void;
}
