import AppLayout from '@cloudscape-design/components/app-layout';
import Ecobee from './Ecobee';
import Breadcrumbs from '../../common/Breadcrumbs';
import { BreadcrumbGroupProps } from '@cloudscape-design/components/breadcrumb-group';
import widgetDetails from '../../common/widgetDetails';
import { Pathname } from '../../routes';
import DhSideNavigation from '../../common/side-navigation';
import useTitle from '../../useTitle';
import Flashbar from '@cloudscape-design/components/flashbar';

export default function EcobeePage() {
  const breadcrumbItems: BreadcrumbGroupProps.Item[] = [
    { text: widgetDetails.ecobee.title, href: Pathname.Ecobee },
  ];
  useTitle(widgetDetails.ecobee.title);

  return (
    <AppLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbItems} />}
      navigationHide
      notifications={
        <Flashbar
          items={[
            {
              header: 'Static preview feature',
              content:
                'This tool is in static preview for demo purposes and does not use live data.',
              dismissible: false,
              type: 'info',
            },
          ]}
        />
      }
      contentType="dashboard"
      content={<Ecobee />}
      toolsHide
    />
  );
}
