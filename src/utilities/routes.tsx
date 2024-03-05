export enum Pathname {
  Home = '/',
  Fallback = '*',
  /** @deprecated Use Pathname.Diablo */
  DiabloMonsterLevelCalculator = '/diablo-monster-level-calculator',
  /** @deprecated Use Pathname.Diablo */
  DiabloSuggestedSigilTierOld = '/diablo-suggested-sigil-tier',
  Diablo = '/diablo',
  CoffeeCalculator = '/coffee',
  Ecobee = '/ecobee',
  Auth = '/auth',
  Signin = '/auth/signin',
  PasswordReset = '/auth/reset',
  Feedback = '/feedback',
  Twitch = '/twitch/:user',
}
