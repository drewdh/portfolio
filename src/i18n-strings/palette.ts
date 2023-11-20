import { ItemsPaletteProps } from '@cloudscape-design/board-components/items-palette';

import { WidgetConfig } from '../widgets/interfaces';

export const paletteI18nStrings: ItemsPaletteProps.I18nStrings<WidgetConfig> = {
  navigationAriaLabel: 'Items palette navigation',
  navigationAriaDescription: 'Click on an item to move focus over',
  navigationItemAriaLabel: (item) => item.data.title,
  liveAnnouncementDndStarted: 'Dragging',
  liveAnnouncementDndDiscarded: 'Insertion discarded',
};
