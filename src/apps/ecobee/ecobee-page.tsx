import { BreadcrumbGroupProps } from '@cloudscape-design/components/breadcrumb-group';

import Ecobee from './ecobee';
import DhBreadcrumbs from 'common/dh-breadcrumbs';
import useTitle from 'utilities/use-title';
import DhAppLayout from 'common/dh-app-layout';
import { AppId, apps } from 'common/apps';

const appDetails = apps.find((app) => app.id === AppId.Ecobee)!;

export default function EcobeePage() {
  const breadcrumbItems: BreadcrumbGroupProps.Item[] = [
    { text: appDetails.title, href: appDetails.href },
  ];
  useTitle(appDetails.title);

  return (
    <DhAppLayout
      breadcrumbs={<DhBreadcrumbs items={breadcrumbItems} />}
      contentType="dashboard"
      content={<Ecobee />}
      toolsHide
    />
  );
}
