import { NonCancelableCustomEvent } from '@cloudscape-design/components';
import { SelectProps } from '@cloudscape-design/components/select';
import { useCallback, useMemo, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import useTitle from 'utilities/use-title';
import { LocalStorageKey } from 'utilities/local-storage-keys';

export default function useMonsterLevelCalculator(): State {
  // TODO: Infer from selected sigil tier
  const worldTier = '3';
  useTitle('Monster level calculator');

  const monsterLevelOptions = useMemo((): SelectProps.Option[] => {
    const options: SelectProps.Option[] = [];
    for (let level = 54; level <= 154; level++) {
      const levelString = String(level);
      options.push({ value: levelString, label: `Level ${levelString}` });
    }
    return options;
  }, []);

  const sigilTierOptions = useMemo((): SelectProps.Options => {
    const worldTierThreeOptions: SelectProps.Option[] = [];
    for (let sigilTier = 1; sigilTier <= 20; sigilTier++) {
      worldTierThreeOptions.push({
        value: String(sigilTier),
        label: `Tier ${sigilTier}`,
      });
    }
    const worldTierFourOptions: SelectProps.Option[] = [];
    for (let sigilTier = 21; sigilTier <= 100; sigilTier++) {
      worldTierFourOptions.push({
        value: String(sigilTier),
        label: `Tier ${sigilTier}`,
      });
    }
    return [
      {
        label: 'Sacred - requires World Tier 3',
        options: worldTierThreeOptions,
      },
      {
        label: 'Ancestral - requires World Tier 4',
        options: worldTierFourOptions,
      },
    ];
  }, []);

  const [selectedSigilTierOption, setSelectedSigilTierOption] = useLocalStorage<SelectProps.Option>(
    LocalStorageKey.DiabloSigilTier,
    (sigilTierOptions[0] as SelectProps.OptionGroup).options[0]
  );

  const [selectedMonsterLevelOption, setSelectedMonsterLevelOption] = useState<SelectProps.Option>(
    () => {
      const newMonsterLevel = String(
        50 + Number(worldTier) + Number((selectedSigilTierOption as SelectProps.Option).value)
      );
      return { value: newMonsterLevel, label: `Level ${newMonsterLevel}` };
    }
  );

  const handleMonsterLevelChange = useCallback(
    (event: NonCancelableCustomEvent<SelectProps.ChangeDetail>): void => {
      const newMonsterLevel = event.detail.selectedOption;
      setSelectedMonsterLevelOption(newMonsterLevel);
      const newSigilTier = String(Number(newMonsterLevel.value) - Number(50) - Number(worldTier));
      setSelectedSigilTierOption({
        value: newSigilTier,
        label: `Tier ${newSigilTier}`,
      });
    },
    []
  );

  const handleSigilTierChange = useCallback(
    (event: NonCancelableCustomEvent<SelectProps.ChangeDetail>): void => {
      const newSigilTier = event.detail.selectedOption;
      setSelectedSigilTierOption(newSigilTier);
      const newMonsterLevel = String(50 + Number(worldTier) + Number(newSigilTier.value));
      setSelectedMonsterLevelOption({
        value: newMonsterLevel,
        label: `Level ${newMonsterLevel}`,
      });
    },
    []
  );

  return {
    handleSigilTierChange,
    handleMonsterLevelChange,
    monsterLevelOptions,
    selectedMonsterLevelOption,
    selectedSigilTierOption,
    sigilTierOptions,
  };
}

interface State {
  handleMonsterLevelChange: (event: NonCancelableCustomEvent<SelectProps.ChangeDetail>) => void;
  handleSigilTierChange: (event: NonCancelableCustomEvent<SelectProps.ChangeDetail>) => void;
  monsterLevelOptions: SelectProps.Options;
  selectedSigilTierOption: SelectProps.Option;
  selectedMonsterLevelOption: SelectProps.Option;
  sigilTierOptions: SelectProps.Options;
}
