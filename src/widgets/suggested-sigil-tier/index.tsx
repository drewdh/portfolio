import AppLayout from '@cloudscape-design/components/app-layout';
import { BreadcrumbGroupProps } from '@cloudscape-design/components/breadcrumb-group';

import SuggestedSigilTier from './SuggestedSigilTier';
import { Pathname } from '../../routes';
import Breadcrumbs from '../../common/Breadcrumbs';
import DhSideNavigation from '../../common/side-navigation';

export default function SuggestedSigilTierPage() {
  const breadcrumbs: BreadcrumbGroupProps.Item[] = [
    { text: 'Diablo IV Nightmare Dungeon: Suggested sigil tier', href: Pathname.DiabloSuggestedSigilTier },
  ];

  return (
    <AppLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
      content={<SuggestedSigilTier />}
      navigation={<DhSideNavigation />}
      toolsHide
    />
  )
}