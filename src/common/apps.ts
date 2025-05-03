import { Pathname } from 'utilities/routes';

export enum AppId {
  Diablo,
  Ecobee,
  Twitch,
  Blackjack,
  Overwatch,
  Rpdr,
}

export interface App {
  id: number;
  title: string;
  description: string;
  href: Pathname;
  isPreview?: boolean;
}

export const apps: App[] = [
  {
    id: AppId.Twitch,
    title: 'Twitch',
    description: 'A reimagined Twitch experience.',
    href: Pathname.Twitch,
  },
  {
    id: AppId.Overwatch,
    title: 'Overwatch log',
    description: 'Track your progress in ranked Overwatch matches.',
    href: Pathname.OwProgress,
  },
  {
    id: AppId.Blackjack,
    title: 'Blackjack',
    description: 'A simple, free version of the card game blackjack.',
    href: Pathname.Blackjack,
    isPreview: true,
  },
  {
    id: AppId.Diablo,
    title: 'Diablo IV',
    description:
      'View player statistics and find which Diablo IV Nightmare Dungeon Sigil Tier to use.',
    href: Pathname.Diablo,
    isPreview: true,
  },
  {
    id: AppId.Ecobee,
    title: 'Ecobee dashboard',
    description: 'A dashboard for viewing statistics for an Ecobee thermostat.',
    href: Pathname.Ecobee,
    isPreview: true,
  },
  {
    id: AppId.Rpdr,
    title: "RuPaul's Drag Race Bracket",
    description: 'A drag-and-drop experiment.',
    href: Pathname.RpdrBracket,
    isPreview: true,
  },
];
