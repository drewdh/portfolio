import Table from '@cloudscape-design/components/table';
import { parse } from 'date-fns/parse';
import Header from '@cloudscape-design/components/header';
import { useEffect, useMemo, useState } from 'react';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Button from '@cloudscape-design/components/button';
import Modal from '@cloudscape-design/components/modal';
import Box from '@cloudscape-design/components/box';
import SplitPanel from '@cloudscape-design/components/split-panel';
import sortBy from 'lodash/sortBy';
import Alert from '@cloudscape-design/components/alert';
import { useBoolean, useLocalStorage } from 'usehooks-ts';

import DhAppLayout from 'common/dh-app-layout';
import widgetDetails from 'common/widget-details';
import useTitle from 'utilities/use-title';
import DhBreadcrumbs from 'common/dh-breadcrumbs';
import { Pathname } from 'utilities/routes';
import { LocalStorageKey } from 'utilities/local-storage-keys';
import { ColumnId, OutcomeDetails } from './types';
import Empty from 'common/empty';
import { columnDefinitions } from './constants';
import useHeaderCounter from 'common/use-header-counter';
import OwProgressForm from './form';

export default function OwProgress() {
  useTitle(widgetDetails.owProgress.title);
  useBackfillItems();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const {
    value: splitPanelOpen,
    setTrue: openSplitPanel,
    setFalse: closeSplitPanel,
  } = useBoolean(false);
  const [items, setItems] = useLocalStorage<OutcomeDetails[]>(LocalStorageKey.OwGames, []);
  const [isPanelClosePending, setIsPanelClosePending] = useState<boolean>(false);
  const [activeEditId, setActiveEditId] = useState<string | null>(null);
  const [pendingEditId, setPendingEditId] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<OutcomeDetails[]>([]);
  const [isUnsavedModalVisible, setIsUnsavedModalVisible] = useState<boolean>(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);

  const counter = useHeaderCounter({
    totalCount: items.length,
    selectedCount: selectedItems.length,
  });

  const sortedItems = useMemo((): OutcomeDetails[] => {
    return sortBy(items, (item) => {
      const fullDateTimeStr = `${item.date} ${item.time}`;
      return parse(fullDateTimeStr, 'yyyy-MM-dd HH:mm', new Date());
    }).reverse();
  }, [items]);

  function openPanel(id: string | null) {
    if (id !== activeEditId && hasUnsavedChanges) {
      setPendingEditId(id);
      setIsUnsavedModalVisible(true);
    } else {
      setActiveEditId(id);
      openSplitPanel();
    }
  }

  function requestPanelDismiss() {
    if (hasUnsavedChanges) {
      setIsPanelClosePending(true);
      setIsUnsavedModalVisible(true);
    } else {
      closeSplitPanel();
    }
  }

  function handleDelete() {
    const selectedIds = selectedItems.map((item) => item.id);
    setItems((prev) => {
      return prev.filter((item) => !selectedIds.includes(item.id));
    });
    setSelectedItems([]);
    setIsDeleteModalVisible(false);
    if (activeEditId && selectedIds.includes(activeEditId)) {
      closeSplitPanel();
      setActiveEditId(null);
    }
  }

  return (
    <DhAppLayout
      toolsHide
      contentType="table"
      splitPanelOpen={splitPanelOpen}
      onSplitPanelToggle={(event) => {
        if (event.detail.open) {
          openSplitPanel();
        } else {
          requestPanelDismiss();
        }
      }}
      splitPanel={
        <SplitPanel
          hidePreferencesButton
          closeBehavior="hide"
          header={activeEditId ? 'Edit match' : 'Add match'}
        >
          <OwProgressForm
            onModifiedChange={(isModified) => setHasUnsavedChanges(isModified)}
            id={activeEditId}
            onDismiss={requestPanelDismiss}
          />
        </SplitPanel>
      }
      splitPanelPreferences={{ position: 'side' }}
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
                header="No matches"
                action={<Button onClick={openSplitPanel}>Add match</Button>}
              />
            }
            header={
              <Header
                counter={counter}
                actions={
                  <SpaceBetween size="xs" direction="horizontal">
                    <Button
                      onClick={() => openPanel(selectedItems[0].id)}
                      disabled={selectedItems.length !== 1}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => setIsDeleteModalVisible(true)}
                      disabled={!selectedItems.length}
                    >
                      Delete
                    </Button>
                    <Button onClick={() => openPanel(null)} variant="primary">
                      Add match
                    </Button>
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
          <DiscardChangesModal
            visible={isUnsavedModalVisible}
            onDismiss={() => {
              if (isPanelClosePending) {
                setPendingEditId(null);
              }
              setIsUnsavedModalVisible(false);
            }}
            onConfirm={() => {
              if (isPanelClosePending) {
                closeSplitPanel();
              }
              setActiveEditId(pendingEditId);
              setPendingEditId(null);
              setIsUnsavedModalVisible(false);
            }}
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

function fixTime(item: OutcomeDetails): string {
  const hour = Number(item.time.substring(0, 2));
  let newHour = hour;
  if (hour >= 24) {
    // Fix issue where 12 hours was incorrectly added to 24-hour times
    newHour = newHour - 12;
  } else if (hour <= 12 && item.period === 'PM') {
    // Convert PM times to 24-hour
    newHour = newHour + 12;
  }
  const minutes = item.time.substring(3);
  return `${newHour}:${minutes}`;
}

/** Add IDs to any items that don't have one and uses 24-hour date */
function useBackfillItems() {
  const [, setItems] = useLocalStorage<OutcomeDetails[]>(LocalStorageKey.OwGames, []);

  useEffect(() => {
    setItems((prev) => {
      return prev.map((item) => ({
        ...item,
        id: item.id ?? crypto.randomUUID(),
        time: fixTime(item),
        period: undefined,
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
      header={selectedCount === 1 ? 'Delete match' : 'Delete matches'}
      visible={visible}
    >
      Permanently delete{' '}
      <b>
        {selectedCount} {selectedCount === 1 ? 'match' : 'matches'}
      </b>
      ? You can't undo this action.
    </Modal>
  );
}

interface DiscardChangesModalProps {
  visible: boolean;
  onConfirm: () => void;
  onDismiss: () => void;
}
function DiscardChangesModal({ onConfirm, onDismiss, visible }: DiscardChangesModalProps) {
  return (
    <Modal
      footer={
        <Box float="right">
          <SpaceBetween size="xs" direction="horizontal">
            <Button onClick={onDismiss} variant="link">
              Cancel
            </Button>
            <Button onClick={onConfirm} variant="primary">
              Discard changes
            </Button>
          </SpaceBetween>
        </Box>
      }
      onDismiss={onDismiss}
      header="Discard changes"
      visible={visible}
    >
      <Alert type="warning">
        Are you sure you want to continue? The changes you made won't be saved.
      </Alert>
    </Modal>
  );
}
