import ContentLayout from '@cloudscape-design/components/content-layout';
import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import Header from '@cloudscape-design/components/header';
import { NonCancelableCustomEvent } from '@cloudscape-design/components';
import FormField from '@cloudscape-design/components/form-field';
import { useCallback, useMemo, useState } from 'react';
import RadioGroup, { RadioGroupProps } from '@cloudscape-design/components/radio-group';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Select, { SelectProps } from '@cloudscape-design/components/select';
import Box from '@cloudscape-design/components/box';
import ColumnLayout from '@cloudscape-design/components/column-layout';

import useLocalStorage, { LocalStorageKey } from '../../useLocalStorage';
import useTitle from '../../useTitle';
import { Pathname } from '../../routes';
import ButtonLink from '../../common/ButtonLink';

const worldTierItems: RadioGroupProps.RadioButtonDefinition[] = [
  { value: '3', label: 'World Tier 3 - Nightmare' },
  { value: '4', label: 'World Tier 4 - Torment' },
];

export default function SuggestedSigilTier() {
  useTitle('Suggested sigil tier');
  const [monsterLevelOffset] = useLocalStorage<number>(LocalStorageKey.DiabloMonsterLevelOffset, 3);
  const [playerWorldTier, setPlayerWorldTier] = useLocalStorage<string>(LocalStorageKey.DiabloWorldTier, '3');

  const playerLevelOptions = useMemo((): SelectProps.Option[] => {
    const options: SelectProps.Option[] = [];
    for (let playerLevel = 1; playerLevel <= 100; playerLevel++) {
      const playerLevelString = String(playerLevel);
      options.push({ label: `Level ${playerLevelString}`, value: playerLevelString });
    }
    return options;
  }, []);

  const [selectedPlayerLevelOption, setSelectedPlayerLevelOption] = useLocalStorage<SelectProps.Option>(LocalStorageKey.DiabloPlayerLevel, playerLevelOptions[50]);
  const [suggestedMonsterLevel, setSuggestedMonsterLevel] = useState<number>(() => {
    const worldTierNumber = Number(playerWorldTier);
    const playerLevelNumber = Number(selectedPlayerLevelOption?.value);
    const minMonsterLevel = worldTierNumber === 3 ? 54 : 75;
    const maxMonsterLevel = worldTierNumber === 3 ? 73 : 154;
    return Math.min(Math.max(minMonsterLevel, playerLevelNumber + monsterLevelOffset), maxMonsterLevel);
  });
  const monsterLevelDiff = Math.abs(suggestedMonsterLevel - Number(selectedPlayerLevelOption?.value));
  const [suggestedSigilTier, setSuggestedSigilTier] = useState<number>(() => {
    const worldTierNumber = Number(playerWorldTier);
    const minSigilTier = worldTierNumber === 3 ? 1 : 21;
    return Math.max(minSigilTier, suggestedMonsterLevel - 50 - worldTierNumber);
  });

  const updateSuggestions = useCallback((newWorldTier: string, playerLevel: string): void => {
    const worldTierNumber = Number(newWorldTier);
    const playerLevelNumber = Number(playerLevel);
    const minMonsterLevel = worldTierNumber === 3 ? 54 : 75;
    const maxMonsterLevel = worldTierNumber === 3 ? 73 : 154;
    const suggestedMonsterLevel = Math.min(Math.max(minMonsterLevel, playerLevelNumber + monsterLevelOffset), maxMonsterLevel);
    const minSigilTier = worldTierNumber === 3 ? 1 : 21;
    const suggestedSigilTier = Math.max(minSigilTier, suggestedMonsterLevel - 50 - worldTierNumber);
    setSuggestedSigilTier(suggestedSigilTier);
    setSuggestedMonsterLevel(suggestedMonsterLevel);
  }, [monsterLevelOffset]);

  const handlePlayerLevelChange = useCallback((event: NonCancelableCustomEvent<SelectProps.ChangeDetail>): void => {
    const newPlayerLevelOption = event.detail.selectedOption;
    setSelectedPlayerLevelOption(newPlayerLevelOption);
    updateSuggestions(playerWorldTier, newPlayerLevelOption.value ?? '1');
  }, [setSelectedPlayerLevelOption, updateSuggestions, playerWorldTier]);

  const handlePlayerWorldTierChange = useCallback((event: NonCancelableCustomEvent<RadioGroupProps.ChangeDetail>): void => {
    const newWorldTier = event.detail.value;
    setPlayerWorldTier(newWorldTier);
    updateSuggestions(newWorldTier, selectedPlayerLevelOption?.value || '1');
  }, [selectedPlayerLevelOption, setPlayerWorldTier, updateSuggestions]);

  const statusType = useMemo((): 'warning' | 'info' | undefined => {
    const playerLevel = Number(selectedPlayerLevelOption?.value);
    if (suggestedMonsterLevel > (playerLevel + monsterLevelOffset)) {
      return 'warning';
    }
    if (suggestedMonsterLevel < (playerLevel + monsterLevelOffset)) {
      return 'info';
    }
  }, [monsterLevelOffset, selectedPlayerLevelOption, suggestedMonsterLevel]);

  const statusMessage = useMemo((): string => {
    const plusSign = suggestedMonsterLevel < Number(selectedPlayerLevelOption?.value) ? '-' : '+';
    return `${plusSign}${monsterLevelDiff} level${monsterLevelDiff === 1 ? '' : 's'}`;
  }, [monsterLevelDiff, selectedPlayerLevelOption, suggestedMonsterLevel]);

  return (
    <ContentLayout
      header={
        <Header
          variant="h1"
          description="The suggested sigil tier maximizes bonus XP from killing higher-level monsters. Monsters 3 levels higher than player level grant the maximum bonus XP of 25%. Monsters more than 3 levels higher grant more base XP but no additional bonus XP."
        >
          Suggested sigil tier
        </Header>
      }
    >
      <Grid gridDefinition={[{ colspan: { default: 12, s: 4 } }, { colspan: { default: 12, s: 8 } }]}>
        <Container header={<Header>Player level</Header>}>
          <SpaceBetween size="l">
            <FormField label="Player level">
              <Select
                selectedOption={selectedPlayerLevelOption}
                onChange={handlePlayerLevelChange}
                options={playerLevelOptions}
              />
            </FormField>
            <FormField label="World Tier">
              <RadioGroup
                value={playerWorldTier}
                onChange={handlePlayerWorldTierChange}
                items={worldTierItems}
              />
            </FormField>
          </SpaceBetween>
        </Container>
        <Container
          header={
            <Header
              actions={<ButtonLink href={Pathname.DiabloSuggestedSigilTierSettings}>Settings</ButtonLink>}
            >
              Suggested sigil tier
            </Header>
          }
        >
          <SpaceBetween size="l">
            <ColumnLayout columns={2} variant="text-grid">
              <div>
                <Box variant="awsui-key-label">Suggested nightmare sigil tier</Box>
                <Box variant="awsui-value-large">Tier {suggestedSigilTier}</Box>
              </div>
              <div>
                <Box variant="awsui-key-label">Monster level</Box>
                <Box variant="awsui-value-large">Level {suggestedMonsterLevel}</Box>
                {statusType && (
                  <div>
                    <StatusIndicator type={statusType}>
                      {statusMessage}
                    </StatusIndicator>
                  </div>
                )}
                {!statusType && (
                  <Box color="text-body-secondary">
                    {statusMessage}
                  </Box>
                )}
              </div>
            </ColumnLayout>
          </SpaceBetween>
        </Container>
      </Grid>
    </ContentLayout>
  );
}
