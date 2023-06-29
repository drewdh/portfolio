import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import CloudscapeBoard, { BoardProps } from '@cloudscape-design/board-components/board';

import useDashboard from './useDashboard';
import { boardI18nStrings } from '../i18n-strings';
import Actions from './Actions';
import ConfirmResetModal from './ConfirmResetModal';
import Empty from './Empty';
import { WidgetConfig } from '../widgets/interfaces';

export default function Board({ onAdd, onPaletteItemsChange }: Props) {
  const {
    handleItemsChange,
    handleResetConfirm,
    handleResetClick,
    handleResetModalDismiss,
    isResetModalVisible,
    items,
    renderItem,
  } = useDashboard({ onPaletteItemsChange });

  return (
    <ContentLayout
      header={
        <Header
          actions={<Actions onAdd={onAdd} onReset={() => handleResetClick(true)} />}
          description="A place where I make small, functional widgets to experiment with different user experience ideas and technologies."
          variant="h1"
        >Drew's Widgets</Header>}
    >
      <CloudscapeBoard
        empty={
          <Empty
            actions={<Actions onAdd={onAdd} onReset={() => handleResetClick(false)}/>}
            title="No widgets"
            description="There are no widgets on the dashboard."
          />
        }
        items={items}
        i18nStrings={boardI18nStrings}
        onItemsChange={handleItemsChange}
        renderItem={renderItem}
      />
      <ConfirmResetModal
        isVisible={isResetModalVisible}
        onConfirm={handleResetConfirm}
        onDismiss={handleResetModalDismiss}
      />
    </ContentLayout>
  );
}

interface Props {
  onAdd: () => void;
  onPaletteItemsChange: (items: ReadonlyArray<BoardProps.Item<WidgetConfig>>) => void;
}
