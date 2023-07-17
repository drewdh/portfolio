import ContentLayout from '@cloudscape-design/components/content-layout';
import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import Header from '@cloudscape-design/components/header';
import { NonCancelableCustomEvent } from '@cloudscape-design/components';
import FormField from '@cloudscape-design/components/form-field';
import { useCallback, useMemo } from 'react';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Select, { SelectProps } from '@cloudscape-design/components/select';
import Box from '@cloudscape-design/components/box';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Tiles, { TilesProps } from '@cloudscape-design/components/tiles';
import Input, { InputProps } from '@cloudscape-design/components/input';

import useLocalStorage, { LocalStorageKey } from '../../useLocalStorage';
import useTitle from '../../useTitle';
import widgetDetails from '../../common/widgetDetails';

const worldTierItems: TilesProps.TilesDefinition[] = [
  { value: '3', label: 'Nightmare', description: 'World Tier 3' },
  { value: '4', label: 'Torment', description: 'World Tier 4' },
];

export default function SuggestedSigilTier() {
  useTitle(widgetDetails.diablo.title);
  const [monsterLevelOffset, setMonsterLevelOffset] = useLocalStorage<number>(LocalStorageKey.DiabloMonsterLevelOffset, 3);
  const [playerWorldTier, setPlayerWorldTier] = useLocalStorage<string>(LocalStorageKey.DiabloWorldTier, '3');

  const playerLevelOptions = useMemo((): SelectProps.Option[] => {
    const options: SelectProps.Option[] = [];
    for (let playerLevel = 1; playerLevel <= 100; playerLevel++) {
      const playerLevelString = String(playerLevel);
      options.push({ label: playerLevelString, value: playerLevelString });
    }
    return options;
  }, []);

  const [selectedPlayerLevelOption, setSelectedPlayerLevelOption] = useLocalStorage<SelectProps.Option>(LocalStorageKey.DiabloPlayerLevel, playerLevelOptions[50]);

  const suggestedMonsterLevel = useMemo((): number => {
    const worldTierNumber = Number(playerWorldTier);
    const playerLevelNumber = Number(selectedPlayerLevelOption?.value);
    const minMonsterLevel = worldTierNumber === 3 ? 54 : 75;
    const maxMonsterLevel = worldTierNumber === 3 ? 73 : 154;
    return Math.min(Math.max(minMonsterLevel, playerLevelNumber + monsterLevelOffset), maxMonsterLevel);
  }, [monsterLevelOffset, playerWorldTier, selectedPlayerLevelOption]);

  const suggestedSigilTier = useMemo((): number => {
    const worldTierNumber = Number(playerWorldTier);
    const minSigilTier = worldTierNumber === 3 ? 1 : 21;
    return Math.max(minSigilTier, suggestedMonsterLevel - 50 - worldTierNumber);
  }, [playerWorldTier, suggestedMonsterLevel]);

  const monsterLevelDiff = suggestedMonsterLevel - Number(selectedPlayerLevelOption?.value);

  const xpMultiplier = useMemo((): number => {
    if (monsterLevelDiff === 1) {
      return .15;
    }
    if (monsterLevelDiff === 2) {
      return .2;
    }
    if (monsterLevelDiff >= 3) {
      return .25;
    }
    if (monsterLevelDiff >= -10) {
      return Math.max(monsterLevelDiff / 10, -1);
    }
    return -1;
  }, [monsterLevelDiff]);

  const xpMultiplierLabel = useMemo((): string => {
    const plusMinus = monsterLevelDiff > -1 ? '+' : '';
    const percent = xpMultiplier.toLocaleString(undefined, { style: 'percent' });
    return `${plusMinus}${percent}`;
  }, [monsterLevelDiff, xpMultiplier]);

  const handleOffsetChange = useCallback((event: NonCancelableCustomEvent<InputProps.ChangeDetail>): void => {
    const { value } = event.detail;
    setMonsterLevelOffset(Number(Number(value).toFixed(0)));
  }, [setMonsterLevelOffset]);

  const handlePlayerLevelChange = useCallback((event: NonCancelableCustomEvent<SelectProps.ChangeDetail>): void => {
    const newPlayerLevelOption = event.detail.selectedOption;
    setSelectedPlayerLevelOption(newPlayerLevelOption);
    // updateSuggestions(playerWorldTier, newPlayerLevelOption.value ?? '1');
  }, [setSelectedPlayerLevelOption]);

  const handlePlayerWorldTierChange = useCallback((event: NonCancelableCustomEvent<TilesProps.ChangeDetail>): void => {
    const newWorldTier = event.detail.value;
    setPlayerWorldTier(newWorldTier);
    // updateSuggestions(newWorldTier, selectedPlayerLevelOption?.value || '1');
  }, [setPlayerWorldTier]);

  const statusType = useMemo((): 'warning' | 'info' | undefined => {
    const playerLevel = Number(selectedPlayerLevelOption?.value);
    if (suggestedMonsterLevel > (playerLevel + monsterLevelOffset)) {
      return 'warning';
    }
  }, [monsterLevelOffset, selectedPlayerLevelOption, suggestedMonsterLevel]);

  const statusMessage = useMemo((): string => {
    const plusSign = suggestedMonsterLevel > Number(selectedPlayerLevelOption?.value) ? '+' : '';
    return `${plusSign}${monsterLevelDiff} level${monsterLevelDiff === 1 ? '' : 's'}`;
  }, [monsterLevelDiff, selectedPlayerLevelOption, suggestedMonsterLevel]);

  return (
    <ContentLayout
      header={
        <Header
          variant="h1"
          description={widgetDetails.diablo.description}
        >{widgetDetails.diablo.title}</Header>
      }
    >
      <Grid gridDefinition={[{ colspan: { default: 12, s: 4 } }, { colspan: { default: 12, s: 8 } }]}>
        <Container header={<Header>Configuration</Header>}>
          <SpaceBetween size="l">
            <FormField label="Player level">
              <Select
                selectedOption={selectedPlayerLevelOption}
                onChange={handlePlayerLevelChange}
                options={playerLevelOptions}
              />
            </FormField>
            <FormField label="World Tier">
              <Tiles
                columns={1}
                value={playerWorldTier}
                onChange={handlePlayerWorldTierChange}
                items={worldTierItems}
              />
            </FormField>
            <FormField
              label="Desired monster level offset"
              description="Desired difference between monster level and player level. The default is 3."
            >
              <Input
                value={String(monsterLevelOffset)}
                onChange={handleOffsetChange}
                type="number"
                inputMode="numeric"
              />
            </FormField>
          </SpaceBetween>
        </Container>
        <Container header={<Header>Details</Header>}>
          <ColumnLayout columns={2} variant="text-grid">
            <SpaceBetween size="l">
              <Box variant="h3" padding="n">
                Dungeon
              </Box>
              <div>
                <Box variant="awsui-key-label">Sigil tier</Box>
                <Box>Tier {suggestedSigilTier}</Box>
              </div>
              <div>
                <Box variant="awsui-key-label">Monster level</Box>
                <Box>Level {suggestedMonsterLevel}</Box>
              </div>
              <div>
                <Box variant="awsui-key-label">Monster level offset</Box>
                {statusType && (
                  <div>
                    <StatusIndicator type={statusType}>
                      {statusMessage}
                    </StatusIndicator>
                  </div>
                )}
                {!statusType && (
                  <div>{statusMessage}</div>
                )}
              </div>
            </SpaceBetween>
            <SpaceBetween size="l">
              <Box variant="h3" padding="n">
                XP bonuses
              </Box>
              <div>
                <Box variant="awsui-key-label">Monster XP multiplier</Box>
                <StatusIndicator type={xpMultiplier > 0 ? 'success' : 'warning'}>
                  {xpMultiplierLabel} XP {xpMultiplier === .25 && '(max)'}
                </StatusIndicator>
              </div>
            </SpaceBetween>
          </ColumnLayout>
        </Container>
      </Grid>
    </ContentLayout>
  );
}
