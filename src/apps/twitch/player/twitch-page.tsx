import DhAppLayout from 'common/dh-app-layout';
import TwitchComponent from './twitch';
import DhBreadcrumbs from 'common/dh-breadcrumbs';
import widgetDetails from 'common/widget-details';
import { Pathname } from 'utilities/routes';
import useTitle from 'utilities/use-title';
import { useParams } from 'react-router';

export default function TwitchPage() {
  useTitle(widgetDetails.twitch.title);
  const { user } = useParams();

  return (
    <DhAppLayout
      toolsHide
      breadcrumbs={
        <DhBreadcrumbs
          items={[
            { text: widgetDetails.twitch.title, href: Pathname.Twitch },
            { text: user ?? '', href: `/twitch/${user}` },
          ]}
        />
      }
      maxContentWidth={1700}
      contentType="wizard"
      content={<TwitchComponent />}
    />
  );
}
