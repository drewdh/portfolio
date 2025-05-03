import { BreadcrumbGroupProps } from '@cloudscape-design/components/breadcrumb-group';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Header from '@cloudscape-design/components/header';
import SplitPanel from '@cloudscape-design/components/split-panel';
import { useCallback, useEffect, useState } from 'react';
import FormField from '@cloudscape-design/components/form-field';
import Select from '@cloudscape-design/components/select';
import Button from '@cloudscape-design/components/button';
import Box from '@cloudscape-design/components/box';
import Modal from '@cloudscape-design/components/modal';
import Alert from '@cloudscape-design/components/alert';
import Table from '@cloudscape-design/components/table';
import Link from '@cloudscape-design/components/link';
import sum from 'lodash/sum';

import SortableList, { SortableListProps } from 'common/sortable-list';
import useTitle from 'utilities/use-title';
import { Pathname } from 'utilities/routes';
import DhAppLayout from 'common/dh-app-layout';
import DhBreadcrumbs from 'common/dh-breadcrumbs';
import { AppId, apps } from 'common/apps';

const initialValue = [
  { id: 'js', label: 'Jewels Sparkles' },
  { id: 'lj', label: "Lana Ja'Rae" },
  { id: 'll', label: 'Lexi Love' },
  { id: 'lbk', label: 'Lydia B Kollins' },
  { id: 'on', label: 'Onya Nurve' },
  { id: 'ss', label: 'Sam Star' },
  { id: 'st', label: 'Suzie Toot' },
];

const appDetails = apps.find((app) => app.id === AppId.Rpdr)!;

export default function RpdrBracket() {
  useTitle(appDetails.title);
  const [unsavedChangesModalVisible, setUnsavedChangesModalVisible] = useState<boolean>(false);
  const [splitPanelOpen, setSplitPanelOpen] = useState<boolean>(false);
  const [splitPanelSize, setSplitPanelSize] = useState<number>(400);
  const [editable, setEditable] = useState<boolean>(true);
  const [items, setItems] = useState<SortableListProps.Item[]>(initialValue);
  const hasChanges = items.some((item, index) => item.id !== initialValue[index].id);

  const breadcrumbs: BreadcrumbGroupProps.Item[] = [
    {
      text: appDetails.title,
      href: appDetails.href,
    },
  ];

  const onBeforeUnload = useCallback(
    (event: BeforeUnloadEvent): void => {
      if (hasChanges) {
        event.preventDefault();
      }
    },
    [hasChanges]
  );

  const totalColumn = {
    id: 'total',
    header: 'Total',
    sortingField: 'total',
    cell: (item: any) => <Box float="right">{sum(item.points)}</Box>,
  };

  useEffect(() => {
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [onBeforeUnload]);

  function cancel() {
    if (hasChanges) {
      return setUnsavedChangesModalVisible(true);
    }
    setSplitPanelOpen(false);
  }

  function reset() {
    setItems(initialValue);
    setEditable(false);
  }

  return (
    <DhAppLayout
      contentType="table"
      onSplitPanelToggle={cancel}
      splitPanelOpen={splitPanelOpen}
      splitPanelSize={splitPanelSize}
      onSplitPanelResize={(event) => setSplitPanelSize(event.detail.size)}
      splitPanelPreferences={{ position: 'side' }}
      splitPanel={
        <SplitPanel header="Drew's confidence pool" closeBehavior="hide" hidePreferencesButton>
          <SpaceBetween size="s">
            <Box>
              Rank the remaining queens based on the likelihood they won't get eliminated this week.
              Guess the eliminated queen correctly, and you'll win the maximum number of points.
            </Box>
            <SpaceBetween size="m">
              <FormField label="Episode">
                <Select
                  triggerVariant="option"
                  selectedOption={{ label: 'Episode 10', description: "The Villain's Roast" }}
                />
              </FormField>
              <SortableList
                disabled={!editable}
                onChange={setItems}
                items={items.map((item, index) => ({
                  ...item,
                  secondaryLabel: ((items.length - index - 1) * 2).toLocaleString(),
                }))}
              />
            </SpaceBetween>
            {editable && (
              <Box float="right">
                <SpaceBetween size="xs" direction="horizontal">
                  <Button variant="link" onClick={cancel}>
                    Cancel
                  </Button>
                  <Button>Save</Button>
                </SpaceBetween>
              </Box>
            )}
          </SpaceBetween>
        </SplitPanel>
      }
      content={
        <>
          <Table
            header={
              <Header description={appDetails.description} variant="h1">
                {appDetails.title}
              </Header>
            }
            sortingColumn={totalColumn}
            sortingDescending
            sortingDisabled
            items={[
              {
                name: 'Andre',
                points: [58, 12, 14, 34, 23],
              },
              {
                name: 'Harry',
                points: [8, 12, 14],
              },
              {
                name: 'Drew',
                points: [8, 12, 14],
              },
            ]}
            variant="full-page"
            stickyColumns={{
              first: 1,
              last: 1,
            }}
            columnDefinitions={[
              {
                id: 'name',
                header: 'Name',
                cell: (item) => (
                  <Link
                    variant="primary"
                    href="/"
                    onFollow={(e) => e.preventDefault()}
                    onClick={() => setSplitPanelOpen(true)}
                  >
                    {item.name}
                  </Link>
                ),
              },
              {
                id: 'week1',
                header: 'Episode 1',
                cell: (item) => <Box float="right">{item.points[0] ?? '-'}</Box>,
              },
              {
                id: 'week2',
                header: 'Episode 2',
                cell: (item) => <Box float="right">{item.points[1] ?? '-'}</Box>,
              },
              {
                id: 'week3',
                header: 'Episode 3',
                cell: (item) => <Box float="right">{item.points[2] ?? '-'}</Box>,
              },
              {
                id: 'week4',
                header: 'Episode 4',
                cell: (item) => <Box float="right">{item.points[3] ?? '-'}</Box>,
              },
              {
                id: 'week5',
                header: 'Episode 5',
                cell: (item) => <Box float="right">{item.points[4] ?? '-'}</Box>,
              },
              {
                id: 'week6',
                header: 'Episode 6',
                cell: (item) => <Box float="right">{item.points[5] ?? '-'}</Box>,
              },
              {
                id: 'week7',
                header: 'Episode 7',
                cell: (item) => <Box float="right">{item.points[6] ?? '-'}</Box>,
              },
              {
                id: 'week8',
                header: 'Episode 8',
                cell: (item) => <Box float="right">{item.points[7] ?? '-'}</Box>,
              },
              {
                id: 'week9',
                header: 'Episode 9',
                cell: (item) => <Box float="right">{item.points[8] ?? '-'}</Box>,
              },
              {
                id: 'week10',
                header: 'Episode 10',
                cell: (item) => <Box float="right">{item.points[9] ?? '-'}</Box>,
              },
              {
                id: 'week11',
                header: 'Episode 11',
                cell: (item) => <Box float="right">{item.points[10] ?? '-'}</Box>,
              },
              totalColumn,
            ]}
          />
          <Modal
            header={<Header>Close panel</Header>}
            footer={
              <Box float="right">
                <SpaceBetween size="xs" direction="horizontal">
                  <Button variant="link" onClick={() => setUnsavedChangesModalVisible(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setUnsavedChangesModalVisible(false);
                      reset();
                      setSplitPanelOpen(false);
                    }}
                  >
                    Close panel
                  </Button>
                </SpaceBetween>
              </Box>
            }
            visible={unsavedChangesModalVisible}
            onDismiss={() => setUnsavedChangesModalVisible(false)}
          >
            <Alert type="warning">
              Are you sure you want to close the panel? Changes you made won't be saved.
            </Alert>
          </Modal>
        </>
      }
      breadcrumbs={<DhBreadcrumbs items={breadcrumbs} />}
      toolsHide
    />
  );
}
