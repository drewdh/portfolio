import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import { useNavigate } from 'react-router';

import DhAppLayout from 'common/dh-app-layout';
import widgetDetails from 'common/widget-details';
import DhBreadcrumbs from 'common/dh-breadcrumbs';
import { Pathname } from 'utilities/routes';
import useTitle from 'utilities/use-title';
import Alert from '@cloudscape-design/components/alert';
import Link from '@cloudscape-design/components/link';
import Button from '@cloudscape-design/components/button';

export default function TwitchPage() {
  useTitle(widgetDetails.twitch.title);
  const navigate = useNavigate();

  return (
    <DhAppLayout
      breadcrumbs={
        <DhBreadcrumbs
          items={[
            {
              href: Pathname.Twitch,
              text: widgetDetails.twitch.title,
            },
          ]}
        />
      }
      toolsHide
      content={
        <ContentLayout
          header={
            <Header
              // actions={isConnected && <Input type="search" value="hey" />}
              variant="h1"
              description={widgetDetails.twitch.description}
            >
              {widgetDetails.twitch.title}
            </Header>
          }
        >
          <Alert header="This app has moved" action={<Button href="https://flux.watch" target="_blank" iconName="external" iconAlign="right">Go to Flux</Button>}>
            To provide a more focused, dedicated experience, this app is now Flux. Check out Flux now at <Link href="https://flux.watch" external>flux.watch</Link>.
          </Alert>
        </ContentLayout>
      }
    />
  );
}
