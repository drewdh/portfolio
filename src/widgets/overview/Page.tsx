import AppLayout from '@cloudscape-design/components/app-layout';

import SideNavigation from '../../side-navigation';
import { topNavSelector } from '../../top-navigation/constants';
import Overview from './Overview';

export default function Page() {

  return (
    <AppLayout
      content={<Overview />}
      contentType="cards"
      disableContentPaddings
      navigation={<SideNavigation />}
      toolsHide
      headerSelector={topNavSelector}
    />
  )
}