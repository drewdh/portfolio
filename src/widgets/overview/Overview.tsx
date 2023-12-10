import Header from '@cloudscape-design/components/header';
import Table, { TableProps } from '@cloudscape-design/components/table';
import { useMemo } from 'react';

import useTitle from '../../useTitle';
import { Pathname } from '../../routes';
import InternalLink from '../../common/InternalLink';
import widgetDetails from '../../common/widgetDetails';

interface Widget {
  title: string;
  href: string;
  description: string;
}

export default function Overview() {
  useTitle();

  const widgets = useMemo((): Widget[] => {
    return [
      {
        title: widgetDetails.ecobee.title,
        href: Pathname.Ecobee,
        description: widgetDetails.ecobee.description,
      },
      {
        title: widgetDetails.diablo.title,
        href: Pathname.DiabloSuggestedSigilTier,
        description: widgetDetails.diablo.description,
      },
    ];
  }, []);

  const columnDefinitions =
    useMemo((): TableProps.ColumnDefinition<Widget>[] => {
      return [
        {
          header: 'App',
          cell: (item) => (
            <InternalLink href={item.href}>{item.title}</InternalLink>
          ),
        },
        {
          header: 'Description',
          cell: (item) => item.description,
        },
      ];
    }, []);

  return (
    <Table<Widget>
      header={
        <Header
          description="Miscellaneous apps for experimenting with different user experience ideas and technologies."
          variant="awsui-h1-sticky"
        >
          Apps
        </Header>
      }
      items={widgets}
      columnDefinitions={columnDefinitions}
      variant="full-page"
      stickyHeader
    />
  );
}
