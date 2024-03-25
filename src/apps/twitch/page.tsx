import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';

import DhAppLayout from 'common/dh-app-layout';
import widgetDetails from 'common/widget-details';
import DhBreadcrumbs from 'common/dh-breadcrumbs';
import { Pathname } from 'utilities/routes';
import useTitle from 'utilities/use-title';
import Alert from '@cloudscape-design/components/alert';
import Button from '@cloudscape-design/components/button';
import { useLocation, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Container from '@cloudscape-design/components/container';
import InternalLink from 'common/internal-link';
import Box from '@cloudscape-design/components/box';
import styles from './styles.module.scss';
import { useGetFollowedStreams } from './api';
import Avatar from './avatar';
import { colorBackgroundInputDisabled } from '@cloudscape-design/design-tokens';

const connectSearchParams = new URLSearchParams({
  response_type: 'token',
  client_id: 'w9wdgvpv3h3m957julwgkn25hxsr38',
  redirect_uri: `${window.location.origin}/twitch/`,
});
// Manually add scope because URLSearchParams encodes characters that Twitch doesn't like
// https://discuss.dev.twitch.com/t/auth-api-doesnt-recognize-a-scope-string-with-replaced-with-3a/22969/2
const scope = 'user%3Aread%3Afollows+user%3Aread%3Achat';
export const connectHref = `https://id.twitch.tv/oauth2/authorize?${connectSearchParams.toString()}&scope=${scope}`;

export default function TwitchPage() {
  useTitle(widgetDetails.twitch.title);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const { hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const hashParams = new URLSearchParams(hash.split('#')[1]);
    const hashAccessToken = hashParams.get('access_token');
    console.log(hashAccessToken);
    if (hashAccessToken) {
      console.log(hashAccessToken);
      localStorage.setItem('access_token', hashAccessToken);
      navigate({ hash: '' }, { replace: true });
    }
    setIsConnected(Boolean(hashAccessToken || localStorage.getItem('access_token')));
  }, [hash, navigate]);

  const { data } = useGetFollowedStreams();
  const followedStreams = data?.pages.flatMap((page) => page.data);

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
            <Header
              // actions={isConnected && <Input type="search" value="hey" />}
              variant="h1"
              description={widgetDetails.twitch.description}
            >
              {widgetDetails.twitch.title}
            </Header>
          }
        >
          {!isConnected && (
            <Alert
              type="info"
              header="Connect to Twitch"
              action={<Button href={connectHref}>Connect</Button>}
            >
              To access Twitch data, you must authorize this site to connect to Twitch. This site
              will never store or sell your data.
            </Alert>
          )}
          {isConnected && followedStreams?.length && (
            <>
              <Header variant="h3">Live channels you follow</Header>
              <ColumnLayout columns={6} minColumnWidth={326}>
                {followedStreams.map((stream) => {
                  const href = `/twitch/${stream.user_login}`;
                  const viewerCount = stream.viewer_count.toLocaleString(undefined, {
                    notation: 'compact',
                  });
                  return (
                    <Container
                      disableContentPaddings
                      media={{
                        position: 'top',
                        content: (
                          <InternalLink href={href}>
                            <img
                              style={{
                                aspectRatio: '16 / 9',
                                backgroundColor: colorBackgroundInputDisabled,
                              }}
                              alt={stream.title}
                              src={`https://static-cdn.jtvnw.net/previews-ttv/live_user_${stream.user_login}-440x248.jpg`}
                            />
                          </InternalLink>
                        ),
                      }}
                    >
                      <div className={styles.thumbnailWrapper}>
                        <Avatar userId={stream.user_id} />
                        <div>
                          <Button variant="inline-link" href={href}>
                            <div className={styles.header}>{stream.title}</div>
                          </Button>
                          <Box color="text-status-inactive" fontSize="body-s">
                            <div>{stream.user_name}</div>
                            <div>{viewerCount} watching</div>
                          </Box>
                        </div>
                      </div>
                    </Container>
                  );
                })}
              </ColumnLayout>
            </>
          )}
        </ContentLayout>
      }
    />
  );
}
