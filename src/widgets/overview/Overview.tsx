import Grid from '@cloudscape-design/components/grid';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Flashbar from '@cloudscape-design/components/flashbar';
import Header from '@cloudscape-design/components/header';
import Cards from '@cloudscape-design/components/cards';
import Link, { LinkProps } from '@cloudscape-design/components/link';
import Box from '@cloudscape-design/components/box';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';

import styles from './styles.module.scss';
import { Pathname } from '../../routes';

export default function Overview() {
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
    <Box margin={{ bottom: 'l' }}>
      <div className={styles.customHeader}>
        <Box padding={{ top: 'xs', horizontal: 's' }}>
          <Grid gridDefinition={[{ colspan: { l: 8, xxs: 10 }, offset: { l: 2, xxs: 1 } }]}>
            <Flashbar items={[ { content: 'This site is under development. Some features might not work as expected.' } ]} />
          </Grid>
        </Box>
        <Box padding={{ vertical: 'xxxl', horizontal: 's' }}>
          <Grid
            gridDefinition={[
              { colspan: { xl: 6, l: 5, s: 6, xxs: 10 }, offset: { l: 2, xxs: 1 } },
              { colspan: { xl: 2, l: 3, s: 4, xxs: 10 }, offset: { s: 0, xxs: 1 } },
            ]}
          >
            <div className={styles.title}>
              <Box variant="h1" fontWeight="heavy" padding="n" fontSize="display-l" color="inherit">
                Drew Hanberry
              </Box>
              <Box fontWeight="light" fontSize="display-l" color="inherit">
                UX Engineer
              </Box>
              <Box variant="p" fontWeight="light">
                <span className={styles.subtitle}>
                  A place where I make small, functional widgets to experiment with different user experience ideas and technologies.
                </span>
              </Box>
            </div>
            <div className={styles.cta}>
              {/*<Container*/}
              {/*  header={<Header>Create distribution</Header>}*/}
              {/*>*/}
              {/*  <SpaceBetween size="xl">*/}
              {/*    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis doloremque doloribus ex illo mollitia nihil numquam pariatur quibusdam ullam vitae. Cumque dignissimos eligendi facere fuga libero maxime reprehenderit sunt, tenetur?*/}
              {/*    <Button variant="primary">*/}
              {/*      View widget portfolio*/}
              {/*    </Button>*/}
              {/*  </SpaceBetween>*/}
              {/*</Container>*/}
            </div>
          </Grid>
        </Box>
      </div>

      <Box padding={{ top: 'xxxl', horizontal: 's' }}>
        <Grid
          gridDefinition={[
            { colspan: { l: 8, s: 10 }, offset: { l: 2, xxs: 1 } },
          ]}
        >
          <SpaceBetween size="xxl">
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
          </SpaceBetween>
        </Grid>
      </Box>
    </Box>
  );
}
