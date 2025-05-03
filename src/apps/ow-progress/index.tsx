import Table from '@cloudscape-design/components/table';
import Header from '@cloudscape-design/components/header';
import { useMemo, useState } from 'react';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Button from '@cloudscape-design/components/button';
import Modal from '@cloudscape-design/components/modal';
import Box from '@cloudscape-design/components/box';
import SplitPanel from '@cloudscape-design/components/split-panel';
import orderBy from 'lodash/orderBy';
import Alert from '@cloudscape-design/components/alert';
import { useBoolean, useLocalStorage } from 'usehooks-ts';

import DhAppLayout from 'common/dh-app-layout';
import { AppId, apps } from 'common/apps';
import useTitle from 'utilities/use-title';
import DhBreadcrumbs from 'common/dh-breadcrumbs';
import { LocalStorageKey } from 'utilities/local-storage-keys';
import { ColumnId, OutcomeDetails } from './types';
import Empty from 'common/empty';
import { columnDefinitions } from './constants';
import useHeaderCounter from 'common/use-header-counter';
import OwProgressForm from './form';

const appDetails = apps.find((app) => app.id === AppId.Overwatch)!;

export default function OwProgress() {
  useTitle(appDetails.title);
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
    return orderBy(items, 'date', 'desc');
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
            onSubmit={closeSplitPanel}
          />
        </SplitPanel>
      }
      splitPanelPreferences={{ position: 'side' }}
      breadcrumbs={<DhBreadcrumbs items={[{ text: appDetails.title, href: appDetails.href }]} />}
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
            trackBy="id"
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
                description={appDetails.description}
              >
                {appDetails.title}
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
                setHasUnsavedChanges(false);
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
