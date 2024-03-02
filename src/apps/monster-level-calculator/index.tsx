import { BreadcrumbGroupProps } from '@cloudscape-design/components/breadcrumb-group';

import { Pathname } from 'utilities/routes';
import DhBreadcrumbs from 'common/dh-breadcrumbs';
import MonsterLevelCalculator from './monster-level-calculator';
import DhAppLayout from 'common/dh-app-layout';

export default function MonsterLevelCalculatorPage() {
  const breadcrumbs: BreadcrumbGroupProps.Item[] = [
    {
      text: 'Diablo IV Nightmare Dungeon: Monster level calculator',
      href: Pathname.DiabloMonsterLevelCalculator,
    },
  ];

  return (
    <DhAppLayout
      breadcrumbs={<DhBreadcrumbs items={breadcrumbs} />}
      content={<MonsterLevelCalculator />}
      navigationHide
      toolsHide
    />
  );
}
