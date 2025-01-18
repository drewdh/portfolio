type WidgetName = 'diablo' | 'coffee' | 'ecobee' | 'feedback' | 'twitch' | 'blackjack';

const widgetDetails: Record<WidgetName, WidgetDetail> = {
  diablo: {
    description:
      'View player statistics and find which Diablo IV Nightmare Dungeon Sigil Tier to use.',
    title: 'Diablo IV',
  },
  coffee: {
    title: 'Pourover calculator',
    description: 'TBD',
  },
  ecobee: {
    title: 'Ecobee dashboard',
    description: 'A dashboard for viewing statistics for an Ecobee thermostat.',
  },
  feedback: {
    title: 'Admin dashboard',
    description: 'A dashboard for viewing site feedback. Requires an administrator account.',
  },
  twitch: {
    title: 'Twitch',
    description: 'A reimagined Twitch experience.',
  },
  blackjack: {
    title: 'Blackjack',
    description: 'A simple, free version of the card game blackjack.',
  },
};

interface WidgetDetail {
  description: string;
  title: string;
}

export default widgetDetails;
