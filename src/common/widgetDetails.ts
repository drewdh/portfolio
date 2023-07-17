const widgetDetails: Record<string, WidgetDetail> = {
  diablo: {
    description: 'Find which Diablo IV Nightmare Dungeon Sigil Tier to use.',
    title: 'Diablo IV Nightmare Dungeon',
  },
};

interface WidgetDetail {
  description: string;
  title: string;
}

export default widgetDetails;
