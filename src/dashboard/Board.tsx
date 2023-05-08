import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import CloudscapeBoard from '@cloudscape-design/board-components/board';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';

import styles from './styles.module.scss';
import useDashboard from './useDashboard';
import { boardI18nStrings } from '../i18n-strings';
import Actions from './Actions';
import ConfirmResetModal from './ConfirmResetModal';

export default function Board() {
  const {
    handleItemsChange,
    handleResetConfirm,
    handleResetClick,
    handleResetModalDismiss,
    isResetModalVisible,
    items,
    renderItem,
  } = useDashboard();

  return (
    <ContentLayout
      header={
        <Header
          actions={<Actions onReset={() => handleResetClick(true)} />}
          description="A place where I make small, functional widgets to experiment with different user experience ideas and technologies."
          variant="h1"
        >Widgets</Header>}
    >
      <CloudscapeBoard
        empty={
          <div className={styles.verticalCenter}>
            <Box margin={{ vertical: 'xs' }} textAlign="center" color="text-body-secondary">
              <SpaceBetween size="xxs">
                <div>
                  <Box variant="strong" color="inherit">
                    No widgets
                  </Box>
                  <Box variant="p" color="inherit">
                    There are no widgets on the dashboard.
                  </Box>
                </div>
                <Actions onReset={() => handleResetClick(false)} />
              </SpaceBetween>
            </Box>
          </div>
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