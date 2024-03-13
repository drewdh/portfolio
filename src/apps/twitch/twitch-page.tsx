import DhAppLayout from 'common/dh-app-layout';
import TwitchComponent from './twitch';
import DhBreadcrumbs from 'common/dh-breadcrumbs';
import widgetDetails from 'common/widget-details';
import { Pathname } from 'utilities/routes';
import useTitle from 'utilities/use-title';

export default function TwitchPage() {
  useTitle(widgetDetails.twitch.title);

  return (
    <DhAppLayout
      toolsHide
      breadcrumbs={
        <DhBreadcrumbs items={[{ text: widgetDetails.twitch.title, href: Pathname.Twitch }]} />
      }
      maxContentWidth={1700}
      contentType="wizard"
      content={<TwitchComponent />}
    />
  );
}
