import AppLayout from '@cloudscape-design/components/app-layout';

import Breadcrumbs from '../../common/Breadcrumbs';
import DhSideNavigation from '../../common/side-navigation';
import Overview from './Overview';

export default function OverviewPage() {
  return (
    <AppLayout
      breadcrumbs={<Breadcrumbs items={[]} />}
      content={<Overview />}
      navigation={<DhSideNavigation />}
      toolsHide
    />
  );
}
