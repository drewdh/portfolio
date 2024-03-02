import { BreadcrumbGroupProps } from '@cloudscape-design/components/breadcrumb-group';

import Ecobee from './ecobee';
import DhBreadcrumbs from '../../common/dh-breadcrumbs';
import widgetDetails from '../../common/widget-details';
import { Pathname } from '../../routes';
import useTitle from '../../utilities/use-title';
import DhAppLayout from '../../common/app-layout/dh-app-layout';

export default function EcobeePage() {
  const breadcrumbItems: BreadcrumbGroupProps.Item[] = [
    { text: widgetDetails.ecobee.title, href: Pathname.Ecobee },
  ];
  useTitle(widgetDetails.ecobee.title);

  return (
    <DhAppLayout
      breadcrumbs={<DhBreadcrumbs items={breadcrumbItems} />}
      navigationHide
      contentType="dashboard"
      content={<Ecobee />}
      toolsHide
    />
  );
}
