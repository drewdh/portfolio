import SpaceBetween from '@cloudscape-design/components/space-between';
import ItemsPalette, { ItemsPaletteProps } from '@cloudscape-design/board-components/items-palette';
import BoardItem from '@cloudscape-design/board-components/board-item';
import Header from '@cloudscape-design/components/header';
import Icon from '@cloudscape-design/components/icon';

import { paletteI18nStrings } from '../i18n-strings/palette';
import { WidgetConfig } from '../widgets/interfaces';
import Empty from './Empty';
import { boardItemI18nStrings } from '../i18n-strings';
import styles from './styles.module.scss';

export default function Palette({ items }: Props) {
  return (
    <SpaceBetween size="l">
      {/* TODO: Add text filter when at least 5 widgets */}
      {items.length > 0 && (
        <ItemsPalette
          items={items}
          renderItem={(item, context) => (
            <BoardItem
              header={<Header>{item.data.title}</Header>}
              i18nStrings={boardItemI18nStrings}
            >
              {context.showPreview && (
                <Empty
                  title={item.data.title}
                  description={item.data.description}
                  icon={<Icon name={item.data.iconName} size="large" />}
                />
              )}
              {!context.showPreview && (
                <SpaceBetween size="xs" direction="horizontal" className={styles.paletteItem}>
                  <Icon name={item.data.iconName} size="large" />
                  {item.data.description}
                </SpaceBetween>
              )}
            </BoardItem>
          )}
          i18nStrings={paletteI18nStrings}
        />
      )}
      {items.length === 0 && (
        <Empty
          title="No more widgets"
          description="All widgets were added to the dashboard already."
        />
      )}
    </SpaceBetween>
  );
}

interface Props {
  items: ReadonlyArray<ItemsPaletteProps.Item<WidgetConfig>>;
}
