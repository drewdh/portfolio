import { useCallback, useState } from 'react';
import { NonCancelableCustomEvent } from '@cloudscape-design/components';
import { InputProps } from '@cloudscape-design/components/input';

import useLocalStorage, { LocalStorageKey } from '../../useLocalStorage';

const waterToCoffeeRatio = 16/1;

export default function useCoffeeCalculator(): State {
  const [coffeeWeight, setCoffeeWeight] = useLocalStorage<string>(LocalStorageKey.CoffeeWeight, '');

  const calculateWaterWeight = useCallback((newCoffeeWeight: string): string => {
    const coffeeWeightNum = Number(newCoffeeWeight);
    if (isNaN(coffeeWeightNum)) {
      return '0';
    }
    // Multiply by 16, round to nearest .1
    const waterWeightNum = coffeeWeightNum * waterToCoffeeRatio;
    return waterWeightNum.toFixed(1);
  }, []);

  const [waterWeight, setWaterWeight] = useState<string>(() => {
    return calculateWaterWeight(coffeeWeight);
  });

  const handleCoffeeWeightChange = useCallback((event: NonCancelableCustomEvent<InputProps.ChangeDetail>): void => {
    const newCoffeeWeight = event.detail.value;
    setCoffeeWeight(newCoffeeWeight);
    setWaterWeight(calculateWaterWeight(newCoffeeWeight));
  }, [calculateWaterWeight, setCoffeeWeight]);

  return {
    coffeeWeight,
    handleCoffeeWeightChange,
    waterWeight,
  };
}

interface State {
  coffeeWeight: string;
  handleCoffeeWeightChange: (event: NonCancelableCustomEvent<InputProps.ChangeDetail>) => void;
  waterWeight: string;
}
