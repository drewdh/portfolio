import AppLayout from '@cloudscape-design/components/app-layout';
import Flashbar from '@cloudscape-design/components/flashbar';

import Dashboard from './Dashboard';
import useNotifications from '../notifications';

export default function Page() {
  const { items } = useNotifications();

  return (
    <AppLayout
      content={<Dashboard />}
      contentType="dashboard"
      navigationHide
      notifications={<Flashbar items={items} stackItems />}
      toolsHide
    />
  );
}
