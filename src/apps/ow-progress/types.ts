export enum Outcome {
  Win = 'win',
  Loss = 'loss',
  Draw = 'draw',
}
export enum Tier {
  Bronze = 'bronze',
  Silver = 'silver',
  Gold = 'gold',
  Platinum = 'platinum',
  Diamond = 'diamond',
  Master = 'master',
  Grandmaster = 'grandmaster',
  Champion = 'champion',
}
export enum Division {
  One = 'one',
  Two = 'two',
  Three = 'three',
  Four = 'four',
  Five = 'five',
}
export enum Modifier {
  WinningTrend = 'winningTrend',
  LosingTrend = 'losingTrend',
  Consolation = 'consolation',
  Reversal = 'reversal',
  UphillBattle = 'uphillBattle',
  Expected = 'expected',
  Calibration = 'calibration',
  Demotion = 'demotion',
  DemotionProtection = 'demotionProtection',
  Wide = 'wide',
  Pressure = 'pressure',
}
export interface OutcomeDetails {
  outcome: Outcome | null;
  tier: Tier | null;
  division: Division | null;
  modifiers: Modifier[];
  date: string;
  time: string;
  period: string;
  rankChange: number;
}
