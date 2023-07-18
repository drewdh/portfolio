const widgetDetails: Record<string, WidgetDetail> = {
  diablo: {
    description: 'View player statistics and find which Diablo IV Nightmare Dungeon Sigil Tier to use.',
    title: 'Diablo IV',
  },
  coffee: {
    title: 'Pourover calculator',
    description: 'TBD',
  },
};

interface WidgetDetail {
  description: string;
  title: string;
}

export default widgetDetails;
