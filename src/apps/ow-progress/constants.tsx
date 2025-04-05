import { TableProps } from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';
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
    id: ColumnId.Tier,
    header: 'Tier',
    cell: ({ tier }) => tierLabels[tier!] ?? '-',
  },
  {
    id: ColumnId.Division,
    header: 'Division',
    cell: ({ division }) => divisionLabels[division!] ?? '-',
  },
  {
    id: ColumnId.Modifiers,
    header: 'Modifiers',
    cell: ({ modifiers }) => modifiers.map((modifier) => modifierLabels[modifier]).join(', '),
  },
  {
    id: ColumnId.Date,
    header: 'Date',
    cell: ({ time, date, period }) => {
      const fullDateTimeStr = `${date} ${time} ${period}`;
      const parsedDate = parse(fullDateTimeStr, 'yyyy-MM-dd hh:mm a', new Date());
      return formatDistanceToNow(parsedDate, { addSuffix: true, includeSeconds: false });
    },
  },
];
