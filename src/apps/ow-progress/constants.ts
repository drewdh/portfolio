import { Division, Modifier, Outcome, Tier } from './types';

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
