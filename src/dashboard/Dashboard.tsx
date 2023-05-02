import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import Board from '@cloudscape-design/board-components/board';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Button from '@cloudscape-design/components/button';

import useDashboard from './useDashboard';

export default function Dashboard() {
  const {
    handleItemsChange,
    i18nStrings,
    items,
    renderItem,
  } = useDashboard();

  return (
    <ContentLayout
      header={
        <Header
          description="A place where I make small, functional widgets to experiment with different user experience ideas and technologies."
          variant="h1"
        >Widgets</Header>}
    >
      <Board
        empty={
          <Box textAlign="center" color="inherit">
            <SpaceBetween size="xxs">
              <div>
                <Box variant="strong" color="inherit">
                  No items
                </Box>
                <Box variant="p" color="inherit">
                  There are no items on the dashboard.
                </Box>
              </div>
              <Button iconName="add-plus">
                Add an item
              </Button>
            </SpaceBetween>
          </Box>
        }
        items={items}
        i18nStrings={i18nStrings}
        onItemsChange={handleItemsChange}
        renderItem={renderItem}
      />
    </ContentLayout>
  );
}