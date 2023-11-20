import AppLayout from '@cloudscape-design/components/app-layout';
import Ecobee from './Ecobee';
import Breadcrumbs from '../../common/Breadcrumbs';
import { BreadcrumbGroupProps } from '@cloudscape-design/components/breadcrumb-group';
import widgetDetails from '../../common/widgetDetails';
import { Pathname } from '../../routes';
import DhSideNavigation from '../../common/side-navigation';
import useTitle from '../../useTitle';

export default function EcobeePage() {
  const breadcrumbItems: BreadcrumbGroupProps.Item[] = [
    { text: widgetDetails.ecobee.title, href: Pathname.Ecobee },
  ];
  useTitle(widgetDetails.ecobee.title);

  return (
    <AppLayout
      contentType="dashboard"
      navigation={<DhSideNavigation />}
      breadcrumbs={<Breadcrumbs items={breadcrumbItems} />}
      content={<Ecobee />}
      toolsHide
    />
  );
}
