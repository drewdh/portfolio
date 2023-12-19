import AppLayout from '@cloudscape-design/components/app-layout';

import Breadcrumbs from '../../common/Breadcrumbs';
import { Pathname } from '../../routes';
import Settings from './Settings';

export default function SettingsPage() {
  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs items={[{ text: 'Settings', href: Pathname.Settings }]} />
      }
      content={<Settings />}
      navigationHide
      toolsHide
    />
  );
}
