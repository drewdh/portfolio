import Table, { TableProps } from '@cloudscape-design/components/table';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { parse } from 'date-fns/parse';
import Header from '@cloudscape-design/components/header';
import { useMemo } from 'react';
import { sortBy } from 'lodash';

import DhAppLayout from 'common/dh-app-layout';
import widgetDetails from 'common/widget-details';
import useTitle from 'utilities/use-title';
import DhBreadcrumbs from 'common/dh-breadcrumbs';
import { Pathname } from 'utilities/routes';
import ButtonLink from 'common/button-link';
import useLocalStorage, { LocalStorageKey } from 'utilities/use-local-storage';
import { OutcomeDetails } from './types';
import { divisionLabels, modifierLabels, outcomeLabels, tierLabels } from './constants';
import Empty from 'common/empty';
import Box from '@cloudscape-design/components/box';

enum ColumnId {
  Outcome = 'outcome',
  RankGainLoss = 'rankGainLoss',
  Modifiers = 'modifiers',
  Tier = 'tier',
  Division = 'division',
  Date = 'date',
}

const columnDefinitions: TableProps.ColumnDefinition<OutcomeDetails>[] = [
  {
    id: ColumnId.Outcome,
    cell: ({ outcome }) => outcomeLabels[outcome!] ?? '-',
    header: 'Outcome',
  },
  {
    id: ColumnId.RankGainLoss,
    header: 'Rank gain/loss',
    cell: ({ rankChange }) => (
      <Box textAlign="right">
        {rankChange > 0 ? '+' : ''}
        {rankChange}%
      </Box>
    ),
  },
  {
    id: ColumnId.Tier,
    header: 'Tier',
    cell: ({ tier }) => tierLabels[tier!] ?? '-',
  },
  {
    id: ColumnId.Division,
    header: 'Division',
    cell: ({ division }) => divisionLabels[division!] ?? '-',
  },
  {
    id: ColumnId.Modifiers,
    header: 'Modifiers',
    cell: ({ modifiers }) => modifiers.map((modifier) => modifierLabels[modifier]).join(', '),
  },
  {
    id: ColumnId.Date,
    header: 'Date',
    cell: ({ time, date, period }) => {
      const fullDateTimeStr = `${date} ${time} ${period}`;
      const parsedDate = parse(fullDateTimeStr, 'yyyy-MM-dd hh:mm a', new Date());
      return formatDistanceToNow(parsedDate, { addSuffix: true, includeSeconds: false });
    },
  },
];

export default function OwProgress() {
  useTitle(widgetDetails.owProgress.title);
  const [items] = useLocalStorage<OutcomeDetails[]>(LocalStorageKey.OwGames, []);

  const sortedItems = useMemo((): OutcomeDetails[] => {
    return sortBy(items, (item) => {
      const fullDateTimeStr = `${item.date} ${item.time} ${item.period}`;
      return parse(fullDateTimeStr, 'yyyy-MM-dd hh:mm a', new Date());
    }).reverse();
  }, [items]);

  return (
    <DhAppLayout
      toolsHide
      breadcrumbs={
        <DhBreadcrumbs
          items={[{ text: widgetDetails.owProgress.title, href: Pathname.OwProgress }]}
        />
      }
      content={
        <Table<OutcomeDetails>
          sortingColumn={columnDefinitions.find(({ id }) => id === ColumnId.Date)}
          sortingDisabled
          sortingDescending
          items={sortedItems}
          columnDefinitions={columnDefinitions}
          empty={
            <Empty
              header="No games"
              action={<ButtonLink href={Pathname.OwProgressCreate}>Add game</ButtonLink>}
            />
          }
          header={
            <Header
              actions={
                <ButtonLink href={Pathname.OwProgressCreate} variant="primary">
                  Add game
                </ButtonLink>
              }
              variant="awsui-h1-sticky"
              description={widgetDetails.owProgress.description}
            >
              {widgetDetails.owProgress.title}
            </Header>
          }
          variant="full-page"
        />
      }
    />
  );
}
