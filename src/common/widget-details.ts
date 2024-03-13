const widgetDetails: Record<string, WidgetDetail> = {
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
    title: 'Twitch player',
    description: 'A customized video player for Twitch.',
  },
};

interface WidgetDetail {
  description: string;
  title: string;
}

export default widgetDetails;
