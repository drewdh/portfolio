import AppLayout from '@cloudscape-design/components/app-layout';

import Breadcrumbs from '../../common/Breadcrumbs';
import { Pathname } from '../../routes';
import DhSideNavigation from '../../common/side-navigation';
import Settings from './Settings';

export default function SettingsPage() {
  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs items={[{ text: 'Settings', href: Pathname.Settings }]} />
      }
      content={<Settings />}
      navigation={<DhSideNavigation />}
      toolsHide
    />
  );
}
