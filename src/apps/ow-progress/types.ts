export enum Outcome {
  Win = 'win',
  Loss = 'loss',
  Draw = 'draw',
}
export enum TierDivision {
  Bronze5 = 'bronze5',
  Bronze4 = 'bronze4',
  Bronze3 = 'bronze3',
  Bronze2 = 'bronze2',
  Bronze1 = 'bronze1',
  Silver5 = 'silver5',
  Silver4 = 'silver4',
  Silver3 = 'silver3',
  Silver2 = 'silver2',
  Silver1 = 'silver1',
  Gold5 = 'gold5',
  Gold4 = 'gold4',
  Gold3 = 'gold3',
  Gold2 = 'gold2',
  Gold1 = 'gold1',
  Platinum5 = 'platinum5',
  Platinum4 = 'platinum4',
  Platinum3 = 'platinum3',
  Platinum2 = 'platinum2',
  Platinum1 = 'platinum1',
  Diamond5 = 'diamond5',
  Diamond4 = 'diamond4',
  Diamond3 = 'diamond3',
  Diamond2 = 'diamond2',
  Diamond1 = 'diamond1',
  Master5 = 'master5',
  Master4 = 'master4',
  Master3 = 'master3',
  Master2 = 'master2',
  Master1 = 'master1',
  Grandmaster5 = 'grandmaster5',
  Grandmaster4 = 'grandmaster4',
  Grandmaster3 = 'grandmaster3',
  Grandmaster2 = 'grandmaster2',
  Grandmaster1 = 'grandmaster1',
  Champion5 = 'champion5',
  Champion4 = 'champion4',
  Champion3 = 'champion3',
  Champion2 = 'champion2',
  Champion1 = 'champion1',
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
  id: string;
  outcome: Outcome | null;
  tierDivision: TierDivision | null;
  modifiers: Modifier[];
  date: Date;
  rankChange: number;
  notes: string;
}
export enum ColumnId {
  Id = 'id',
  Outcome = 'outcome',
  RankChange = 'rankChange',
  Modifiers = 'modifiers',
  NewRank = 'newRank',
  Date = 'date',
  Notes = 'notes',
}
