import { TableProps } from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import { SelectProps } from '@cloudscape-design/components/select';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';

import { ColumnId, Modifier, Outcome, OutcomeDetails, TierDivision } from './types';

export const outcomeLabels: Record<Outcome, string> = {
  [Outcome.Win]: 'Win',
  [Outcome.Loss]: 'Loss',
  [Outcome.Draw]: 'Draw',
};
export const modifierLabels: Record<Modifier, string> = {
  [Modifier.WinningTrend]: 'Winning trend',
  [Modifier.LosingTrend]: 'Losing trend',
  [Modifier.Consolation]: 'Consolation',
  [Modifier.Reversal]: 'Reversal',
  [Modifier.UphillBattle]: 'Uphill battle',
  [Modifier.Expected]: 'Expected',
  [Modifier.Calibration]: 'Calibration',
  [Modifier.Demotion]: 'Demotion',
  [Modifier.DemotionProtection]: 'Demotion protection',
  [Modifier.Wide]: 'Wide',
  [Modifier.Pressure]: 'Pressure',
};
export const tierDivisionLabels: Record<TierDivision, string> = {
  [TierDivision.Bronze5]: 'Bronze 5',
  [TierDivision.Bronze4]: 'Bronze 4',
  [TierDivision.Bronze3]: 'Bronze 3',
  [TierDivision.Bronze2]: 'Bronze 2',
  [TierDivision.Bronze1]: 'Bronze 1',
  [TierDivision.Silver5]: 'Silver 5',
  [TierDivision.Silver4]: 'Silver 4',
  [TierDivision.Silver3]: 'Silver 3',
  [TierDivision.Silver2]: 'Silver 2',
  [TierDivision.Silver1]: 'Silver 1',
  [TierDivision.Gold5]: 'Gold 5',
  [TierDivision.Gold4]: 'Gold 4',
  [TierDivision.Gold3]: 'Gold 3',
  [TierDivision.Gold2]: 'Gold 2',
  [TierDivision.Gold1]: 'Gold 1',
  [TierDivision.Platinum5]: 'Platinum 5',
  [TierDivision.Platinum4]: 'Platinum 4',
  [TierDivision.Platinum3]: 'Platinum 3',
  [TierDivision.Platinum2]: 'Platinum 2',
  [TierDivision.Platinum1]: 'Platinum 1',
  [TierDivision.Diamond5]: 'Diamond 5',
  [TierDivision.Diamond4]: 'Diamond 4',
  [TierDivision.Diamond3]: 'Diamond 3',
  [TierDivision.Diamond2]: 'Diamond 2',
  [TierDivision.Diamond1]: 'Diamond 1',
  [TierDivision.Master5]: 'Master 5',
  [TierDivision.Master4]: 'Master 4',
  [TierDivision.Master3]: 'Master 3',
  [TierDivision.Master2]: 'Master 2',
  [TierDivision.Master1]: 'Master 1',
  [TierDivision.Grandmaster5]: 'Grandmaster 5',
  [TierDivision.Grandmaster4]: 'Grandmaster 4',
  [TierDivision.Grandmaster3]: 'Grandmaster 3',
  [TierDivision.Grandmaster2]: 'Grandmaster 2',
  [TierDivision.Grandmaster1]: 'Grandmaster 1',
  [TierDivision.Champion5]: 'Champion 5',
  [TierDivision.Champion4]: 'Champion 4',
  [TierDivision.Champion3]: 'Champion 3',
  [TierDivision.Champion2]: 'Champion 2',
  [TierDivision.Champion1]: 'Champion 1',
};
export const tierDivisionOptions: SelectProps.Option[] = [
  { label: tierDivisionLabels[TierDivision.Champion1], value: TierDivision.Champion1 },
  { label: tierDivisionLabels[TierDivision.Champion2], value: TierDivision.Champion2 },
  { label: tierDivisionLabels[TierDivision.Champion3], value: TierDivision.Champion3 },
  { label: tierDivisionLabels[TierDivision.Champion4], value: TierDivision.Champion4 },
  { label: tierDivisionLabels[TierDivision.Champion5], value: TierDivision.Champion5 },
  { label: tierDivisionLabels[TierDivision.Grandmaster1], value: TierDivision.Grandmaster1 },
  { label: tierDivisionLabels[TierDivision.Grandmaster2], value: TierDivision.Grandmaster2 },
  { label: tierDivisionLabels[TierDivision.Grandmaster3], value: TierDivision.Grandmaster3 },
  { label: tierDivisionLabels[TierDivision.Grandmaster4], value: TierDivision.Grandmaster4 },
  { label: tierDivisionLabels[TierDivision.Grandmaster5], value: TierDivision.Grandmaster5 },
  { label: tierDivisionLabels[TierDivision.Master1], value: TierDivision.Master1 },
  { label: tierDivisionLabels[TierDivision.Master2], value: TierDivision.Master2 },
  { label: tierDivisionLabels[TierDivision.Master3], value: TierDivision.Master3 },
  { label: tierDivisionLabels[TierDivision.Master4], value: TierDivision.Master4 },
  { label: tierDivisionLabels[TierDivision.Master5], value: TierDivision.Master5 },
  { label: tierDivisionLabels[TierDivision.Diamond1], value: TierDivision.Diamond1 },
  { label: tierDivisionLabels[TierDivision.Diamond2], value: TierDivision.Diamond2 },
  { label: tierDivisionLabels[TierDivision.Diamond3], value: TierDivision.Diamond3 },
  { label: tierDivisionLabels[TierDivision.Diamond4], value: TierDivision.Diamond4 },
  { label: tierDivisionLabels[TierDivision.Diamond5], value: TierDivision.Diamond5 },
  { label: tierDivisionLabels[TierDivision.Platinum1], value: TierDivision.Platinum1 },
  { label: tierDivisionLabels[TierDivision.Platinum2], value: TierDivision.Platinum2 },
  { label: tierDivisionLabels[TierDivision.Platinum3], value: TierDivision.Platinum3 },
  { label: tierDivisionLabels[TierDivision.Platinum4], value: TierDivision.Platinum4 },
  { label: tierDivisionLabels[TierDivision.Platinum5], value: TierDivision.Platinum5 },
  { label: tierDivisionLabels[TierDivision.Gold1], value: TierDivision.Gold1 },
  { label: tierDivisionLabels[TierDivision.Gold2], value: TierDivision.Gold2 },
  { label: tierDivisionLabels[TierDivision.Gold3], value: TierDivision.Gold3 },
  { label: tierDivisionLabels[TierDivision.Gold4], value: TierDivision.Gold4 },
  { label: tierDivisionLabels[TierDivision.Gold5], value: TierDivision.Gold5 },
  { label: tierDivisionLabels[TierDivision.Silver1], value: TierDivision.Silver1 },
  { label: tierDivisionLabels[TierDivision.Silver2], value: TierDivision.Silver2 },
  { label: tierDivisionLabels[TierDivision.Silver3], value: TierDivision.Silver3 },
  { label: tierDivisionLabels[TierDivision.Silver4], value: TierDivision.Silver4 },
  { label: tierDivisionLabels[TierDivision.Silver5], value: TierDivision.Silver5 },
  { label: tierDivisionLabels[TierDivision.Bronze1], value: TierDivision.Bronze1 },
  { label: tierDivisionLabels[TierDivision.Bronze2], value: TierDivision.Bronze2 },
  { label: tierDivisionLabels[TierDivision.Bronze3], value: TierDivision.Bronze3 },
  { label: tierDivisionLabels[TierDivision.Bronze4], value: TierDivision.Bronze4 },
  { label: tierDivisionLabels[TierDivision.Bronze5], value: TierDivision.Bronze5 },
];
export const modifierOptions: SelectProps.Option[] = [
  {
    label: modifierLabels[Modifier.WinningTrend],
    value: Modifier.WinningTrend,
    description: 'Bonus for high win rate',
  },
  {
    label: modifierLabels[Modifier.LosingTrend],
    value: Modifier.LosingTrend,
    description: 'Penalty for high loss rate',
  },
  {
    label: modifierLabels[Modifier.Consolation],
    value: Modifier.Consolation,
    description: "You weren't favored and you lost",
  },
  {
    label: modifierLabels[Modifier.Reversal],
    value: Modifier.Reversal,
    description: 'You were favored but you lost',
  },
  {
    label: modifierLabels[Modifier.UphillBattle],
    value: Modifier.UphillBattle,
    description: "You weren't favored but you won",
  },
  {
    label: modifierLabels[Modifier.Expected],
    value: Modifier.Expected,
    description: 'You were favored and you won',
  },
  {
    label: modifierLabels[Modifier.Calibration],
    value: Modifier.Calibration,
    description: 'Your rank is uncertain',
  },
  {
    label: modifierLabels[Modifier.Demotion],
    value: Modifier.Demotion,
    description: 'You lost a match while in Demotion Protection',
  },
  {
    label: modifierLabels[Modifier.DemotionProtection],
    value: Modifier.DemotionProtection,
    description: 'If you lose again you will rank down',
  },
  {
    label: modifierLabels[Modifier.Wide],
    value: Modifier.Wide,
    description: 'Your group is wide so you gained or lost less rank',
  },
  {
    label: modifierLabels[Modifier.Pressure],
    value: Modifier.Pressure,
    description: 'You were pushed toward average at a high or low rank',
  },
];
export const columnDefinitions: TableProps.ColumnDefinition<OutcomeDetails>[] = [
  {
    id: ColumnId.Outcome,
    cell: ({ outcome }) => outcomeLabels[outcome!] ?? '-',
    header: 'Outcome',
  },
  {
    id: ColumnId.RankChange,
    header: 'Rank change',
    cell: ({ rankChange }) => (
      <Box textAlign="right">
        {rankChange > 0 ? '+' : ''}
        {rankChange}%
      </Box>
    ),
  },
  {
    id: ColumnId.Modifiers,
    header: 'Modifiers',
    cell: ({ modifiers }) =>
      modifiers.map((modifier) => modifierLabels[modifier]).join(', ') || '-',
  },
  {
    id: ColumnId.NewRank,
    header: 'New rank',
    cell: ({ tierDivision }) => tierDivisionLabels[tierDivision!],
  },
  {
    id: ColumnId.Notes,
    header: 'Notes',
    cell: ({ notes }) => notes || '-',
  },
  {
    id: ColumnId.Date,
    header: 'Date',
    cell: ({ date }) => {
      if (!date) {
        return '-';
      }
      const formattedDate = formatDistanceToNow(date, {
        addSuffix: true,
        includeSeconds: false,
      });
      return <Box textAlign="right">{formattedDate}</Box>;
    },
  },
];
