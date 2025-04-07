import { TableProps } from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
import { SelectProps } from '@cloudscape-design/components/select';
import { parse } from 'date-fns/parse';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';

import { ColumnId, Division, Modifier, Outcome, OutcomeDetails, Tier } from './types';

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
export const tierLabels: Record<Tier, string> = {
  [Tier.Bronze]: 'Bronze',
  [Tier.Silver]: 'Silver',
  [Tier.Gold]: 'Gold',
  [Tier.Platinum]: 'Platinum',
  [Tier.Diamond]: 'Diamond',
  [Tier.Master]: 'Master',
  [Tier.Grandmaster]: 'Grandmaster',
  [Tier.Champion]: 'Champion',
};
export const divisionLabels: Record<Division, string> = {
  [Division.One]: '1',
  [Division.Two]: '2',
  [Division.Three]: '3',
  [Division.Four]: '4',
  [Division.Five]: '5',
};
export const tierOptions: SelectProps.Option[] = [
  { label: tierLabels[Tier.Champion], value: Tier.Champion },
  { label: tierLabels[Tier.Grandmaster], value: Tier.Grandmaster },
  { label: tierLabels[Tier.Master], value: Tier.Master },
  { label: tierLabels[Tier.Diamond], value: Tier.Diamond },
  { label: tierLabels[Tier.Platinum], value: Tier.Platinum },
  { label: tierLabels[Tier.Gold], value: Tier.Gold },
  { label: tierLabels[Tier.Silver], value: Tier.Silver },
  { label: tierLabels[Tier.Bronze], value: Tier.Bronze },
];
export const divisionOptions: SelectProps.Option[] = [
  { label: divisionLabels[Division.One], value: Division.One },
  { label: divisionLabels[Division.Two], value: Division.Two },
  { label: divisionLabels[Division.Three], value: Division.Three },
  { label: divisionLabels[Division.Four], value: Division.Four },
  { label: divisionLabels[Division.Five], value: Division.Five },
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
    id: ColumnId.RankGainLoss,
    header: 'Rank gain/loss',
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
    cell: ({ tier, division }) => `${tierLabels[tier!]} ${divisionLabels[division!]}`,
  },
  {
    id: ColumnId.Notes,
    header: 'Notes',
    cell: ({ notes }) => notes || '-',
  },
  {
    id: ColumnId.Date,
    header: 'Date',
    cell: ({ time, date }) => {
      const fullDateTimeStr = `${date} ${time}`;
      const parsedDate = parse(fullDateTimeStr, 'yyyy-MM-dd HH:mm', new Date());
      const formattedDate = formatDistanceToNow(parsedDate, {
        addSuffix: true,
        includeSeconds: false,
      });
      return <Box textAlign="right">{formattedDate}</Box>;
    },
  },
];
