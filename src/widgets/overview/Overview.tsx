import Header from '@cloudscape-design/components/header';
import ContentLayout from '@cloudscape-design/components/content-layout';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Button from '@cloudscape-design/components/button';
import Cards from '@cloudscape-design/components/cards';
import Link, { LinkProps } from '@cloudscape-design/components/link';
import Box from '@cloudscape-design/components/box';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';

import { usePreviewNotification } from '../../usePreviewNotification';
import { Pathname } from '../../routes';

export function Overview() {
  usePreviewNotification();
  const navigate = useNavigate();

  const handleFollow = useCallback((event: CustomEvent<LinkProps.FollowDetail>): void => {
    const { external, href } = event.detail;
    if (external || !href) {
      return;
    }
    event.preventDefault();
    navigate(href);
  }, [navigate]);

  return (
    <ContentLayout
      disableOverlap
      header={
        <Header
          actions={
            <SpaceBetween size="xs" direction="horizontal">
              <Button
                iconAlign="right"
                iconName="external"
                target="_blank"
                href="#/"
              >
                Browse code
              </Button>
            </SpaceBetween>
          }
          description="Small tools that also serve as experiments for different user experience ideas and technologies."
          variant="h1"
        >Widgets portfolio overview</Header>
      }
    >
      <Box padding={{ top: 'xxl' }}>
        <Cards
          cardDefinition={{
            header: item => (
              <Link
                fontSize="heading-m"
                onFollow={handleFollow}
                href={Pathname.PomodoroTimer}
              >{item.name}</Link>
            ),
            sections: [
              {
                content: item => item.description,
              },
            ]
          }}
          cardsPerRow={[
            { cards: 1 },
            { minWidth: 500, cards: 2 }
          ]}
          items={[
            {
              name: 'Pomodoro timer',
              description: 'A time management tool that uses the Pomodoro Technique to help improve productivity.',
            },
          ]}
          header={<Header counter="(1)">Widgets</Header>}
        />
      </Box>
    </ContentLayout>
  )
}