import AppLayout from '@cloudscape-design/components/app-layout';
import Flashbar from '@cloudscape-design/components/flashbar';

import Breadcrumbs from '../../breadcrumbs';
import { Pathname } from '../../routes';
import SideNavigation from '../../side-navigation';
import Timer from './Timer';
import useNotifications from '../../notifications';
import { topNavSelector } from '../../top-navigation/constants';

export default function Page() {
  const { items } = useNotifications();

  return (
    <AppLayout
      breadcrumbs={<Breadcrumbs items={[{ text: 'Pomodoro timer', href: Pathname.PomodoroTimer }]} />}
      content={<Timer />}
      contentType="form"
      navigation={<SideNavigation />}
      notifications={<Flashbar items={items} stackItems />}
      toolsHide
      headerSelector={topNavSelector}
    />
  );
}
