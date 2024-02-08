import { BreadcrumbGroupProps } from '@cloudscape-design/components/breadcrumb-group';

import { Pathname } from '../../routes';
import Breadcrumbs from '../../common/Breadcrumbs';
import MonsterLevelCalculator from './MonsterLevelCalculator';
import DhAppLayout from '../../common/app-layout/dh-app-layout';

export default function MonsterLevelCalculatorPage() {
  const breadcrumbs: BreadcrumbGroupProps.Item[] = [
    {
      text: 'Diablo IV Nightmare Dungeon: Monster level calculator',
      href: Pathname.DiabloMonsterLevelCalculator,
    },
  ];

  return (
    <DhAppLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
      content={<MonsterLevelCalculator />}
      navigationHide
      toolsHide
    />
  );
}
