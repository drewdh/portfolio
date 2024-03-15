import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Container from '@cloudscape-design/components/container';
import Box from '@cloudscape-design/components/box';
import Link from '@cloudscape-design/components/link';

import DhAppLayout from 'common/dh-app-layout';
import widgetDetails from 'common/widget-details';
import DhBreadcrumbs from 'common/dh-breadcrumbs';
import { Pathname } from 'utilities/routes';
import useTitle from 'utilities/use-title';
import styles from './styles.module.scss';
import InternalLink from 'common/internal-link';

export default function TwitchPage() {
  useTitle(widgetDetails.twitch.title);

  return (
    <DhAppLayout
      maxContentWidth={3100}
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
            <Header variant="h1" description={widgetDetails.twitch.description}>
              {widgetDetails.twitch.title}
            </Header>
          }
        >
          {/* TODO: Make this responsive */}
          <ColumnLayout columns={4}>
            <Container
              disableContentPaddings
              media={{
                content: (
                  <InternalLink href="/twitch/skiesti">
                    <img
                      height="248px"
                      src="https://static-cdn.jtvnw.net/previews-ttv/live_user_skiesti-440x248.jpg"
                    />
                  </InternalLink>
                ),
              }}
            >
              <div className={styles.thumbnailWrapper}>
                <img
                  src="https://static-cdn.jtvnw.net/jtv_user_pictures/26989fcb-38ca-43a9-a960-a26940aec549-profile_image-70x70.png"
                  className={styles.avatar}
                />
                <div>
                  <div className={styles.header}>
                    <Box variant="h3" padding={{ top: 'n' }}>
                      <InternalLink fontSize="heading-s" href="/twitch/skiesti">
                        [!DROPS] MOIRA MERCY MOIRA MERCY MOIRA MERCY MOIRA MERCY | !mercyhelp
                        @skiesti
                      </InternalLink>
                    </Box>
                  </div>
                  <Box color="text-status-inactive" fontSize="body-s">
                    <div>Skiesti</div>
                    <div>604 watching</div>
                  </Box>
                </div>
              </div>
            </Container>
          </ColumnLayout>
        </ContentLayout>
      }
    />
  );
}
