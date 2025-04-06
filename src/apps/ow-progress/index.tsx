import Table from '@cloudscape-design/components/table';
import { parse } from 'date-fns/parse';
import Header from '@cloudscape-design/components/header';
import { useEffect, useMemo, useState } from 'react';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Button from '@cloudscape-design/components/button';
import Modal from '@cloudscape-design/components/modal';
import Box from '@cloudscape-design/components/box';

import { sortBy } from 'lodash';
import DhAppLayout from 'common/dh-app-layout';
import widgetDetails from 'common/widget-details';
import useTitle from 'utilities/use-title';
import DhBreadcrumbs from 'common/dh-breadcrumbs';
import { Pathname } from 'utilities/routes';
import ButtonLink from 'common/button-link';
import useLocalStorage, { LocalStorageKey } from 'utilities/use-local-storage';
import { ColumnId, OutcomeDetails } from './types';
import Empty from 'common/empty';
import { columnDefinitions } from './constants';
import useHeaderCounter from 'common/use-header-counter';

export default function OwProgress() {
  useTitle(widgetDetails.owProgress.title);
  useBackfillIds();
  const [items, setItems] = useLocalStorage<OutcomeDetails[]>(LocalStorageKey.OwGames, []);
  const [selectedItems, setSelectedItems] = useState<OutcomeDetails[]>([]);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);

  const counter = useHeaderCounter({
    totalCount: items.length,
    selectedCount: selectedItems.length,
  });

  const sortedItems = useMemo((): OutcomeDetails[] => {
    return sortBy(items, (item) => {
      const fullDateTimeStr = `${item.date} ${item.time} ${item.period}`;
      return parse(fullDateTimeStr, 'yyyy-MM-dd hh:mm a', new Date());
    }).reverse();
  }, [items]);

  function handleDelete() {
    const selectedIds = selectedItems.map((item) => item.id);
    setItems((prev) => {
      return prev.filter((item) => !selectedIds.includes(item.id));
    });
    setSelectedItems([]);
    setIsDeleteModalVisible(false);
  }

  return (
    <DhAppLayout
      toolsHide
      breadcrumbs={
        <DhBreadcrumbs
          items={[{ text: widgetDetails.owProgress.title, href: Pathname.OwProgress }]}
        />
      }
      content={
        <>
          <Table<OutcomeDetails>
            sortingColumn={columnDefinitions.find(({ id }) => id === ColumnId.Date)}
            sortingDisabled
            sortingDescending
            items={sortedItems}
            columnDefinitions={columnDefinitions}
            selectionType="multi"
            onSelectionChange={(e) => setSelectedItems(e.detail.selectedItems)}
            selectedItems={selectedItems}
            empty={
              <Empty
                header="No games"
                action={<ButtonLink href={Pathname.OwProgressCreate}>Add game</ButtonLink>}
              />
            }
            header={
              <Header
                counter={counter}
                actions={
                  <SpaceBetween size="xs" direction="horizontal">
                    <ButtonLink
                      href={`${Pathname.OwProgress}/edit/${selectedItems[0]?.id}`}
                      disabled={selectedItems.length !== 1}
                    >
                      Edit
                    </ButtonLink>
                    <Button
                      onClick={() => setIsDeleteModalVisible(true)}
                      disabled={!selectedItems.length}
                    >
                      Delete
                    </Button>
                    <ButtonLink href={Pathname.OwProgressCreate} variant="primary">
                      Add game
                    </ButtonLink>
                  </SpaceBetween>
                }
                variant="awsui-h1-sticky"
                description={widgetDetails.owProgress.description}
              >
                {widgetDetails.owProgress.title}
              </Header>
            }
            variant="full-page"
          />
          <DeleteModal
            visible={isDeleteModalVisible}
            selectedCount={selectedItems.length}
            onDismiss={() => setIsDeleteModalVisible(false)}
            onConfirm={handleDelete}
          />
        </>
      }
    />
  );
}

/** Add IDs to any items that don't have one */
function useBackfillIds() {
  const [, setItems] = useLocalStorage<OutcomeDetails[]>(LocalStorageKey.OwGames, []);

  useEffect(() => {
    setItems((prev) => {
      return prev.map((item) => ({
        ...item,
        id: item.id ?? crypto.randomUUID(),
      }));
    });
  }, [setItems]);
}

interface DeleteModalProps {
  visible: boolean;
  selectedCount: number;
  onConfirm: () => void;
  onDismiss: () => void;
}
function DeleteModal({ onConfirm, onDismiss, selectedCount, visible }: DeleteModalProps) {
  return (
    <Modal
      footer={
        <Box float="right">
          <SpaceBetween size="xs" direction="horizontal">
            <Button onClick={onDismiss} variant="link">
              Cancel
            </Button>
            <Button onClick={onConfirm} variant="primary">
              Delete
            </Button>
          </SpaceBetween>
        </Box>
      }
      onDismiss={onDismiss}
      header={selectedCount === 1 ? 'Delete game' : 'Delete games'}
      visible={visible}
    >
      Permanently delete{' '}
      <b>
        {selectedCount} {selectedCount === 1 ? 'game' : 'games'}
      </b>
      ? You can't undo this action.
    </Modal>
  );
}
