import { Table, TableProps } from '@cloudscape-design/components';
import Header from '@cloudscape-design/components/header';
import { useMemo } from 'react';

import useTitle from '../../useTitle';
import { Pathname } from '../../routes';
import Link from '@cloudscape-design/components/link';

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
        title: 'Diablo IV Nightmare Dungeon: Suggested sigil tier',
        href: Pathname.DiabloSuggestedSigilTier,
        description: 'The suggested sigil tier maximizes bonus XP from killing higher-level monsters. Monsters 3 levels higher than player level grant the maximum bonus XP of 25%. Monsters more than 3 levels higher grant more base XP but no additional bonus XP.',
      },
      {
        title: 'Diablo IV Nightmare Dungeon: Monster level calculator',
        href: Pathname.DiabloMonsterLevelCalculator,
        description: 'Calculate the sigil tier required for your desired monster level, or see what level the monsters are for a specific sigil tier.',
      },
    ];
  }, []);

  const columnDefinitions = useMemo((): TableProps.ColumnDefinition<Widget>[] => {
    return [
      {
        header: 'Widget',
        cell: (item) => (
          <Link href={item.href}>{item.title}</Link>
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
      header={<Header description="A place where I make small, functional widgets to experiment with different user experience ideas and technologies." variant="awsui-h1-sticky">Drew's Widgets</Header>}
      items={widgets}
      columnDefinitions={columnDefinitions}
      variant="full-page"
      stickyHeader
    />
  )
}