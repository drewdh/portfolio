import AppLayout from '@cloudscape-design/components/app-layout';
import { BreadcrumbGroupProps } from '@cloudscape-design/components/breadcrumb-group';

import { Pathname } from '../../routes';
import Breadcrumbs from '../../common/Breadcrumbs';
import MonsterLevelCalculator from './MonsterLevelCalculator';
import { topNavSelector } from '../../top-navigation/constants';

export default function MonsterLevelCalculatorPage() {
  const breadcrumbs: BreadcrumbGroupProps.Item[] = [
    {
      text: 'Diablo IV Nightmare Dungeon: Monster level calculator',
      href: Pathname.DiabloMonsterLevelCalculator,
    },
  ];

  return (
    <AppLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
      content={<MonsterLevelCalculator />}
      navigationHide
      headerSelector={topNavSelector}
      toolsHide
    />
  );
}
