import Box from '@cloudscape-design/components/box';
import Grid from '@cloudscape-design/components/grid';
import SpaceBetween from '@cloudscape-design/components/space-between';

import styles from './styles.module.scss';
import { usePreviewNotification } from '../usePreviewNotification';

export function Home() {
  usePreviewNotification();

  return (
    <Box margin={{ bottom: 'l' }}>
      <div className={styles.customHeader}>
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
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium commodi distinctio dolores dolorum fugit illum impedit ipsum laboriosam natus, nostrum porro quasi qui quo repudiandae saepe sit ullam veniam voluptatum!
                </span>
              </Box>
            </div>
            {/*<div className={styles.cta}>*/}
            {/*  <Container*/}
            {/*    header={<Header>Create distribution</Header>}*/}
            {/*  >*/}
            {/*    <SpaceBetween size="xl">*/}
            {/*      <FormField stretch label="Delivery method">*/}
            {/*        <Select options={[]} selectedOption={null} />*/}
            {/*      </FormField>*/}
            {/*      <Button variant="primary">*/}
            {/*        Next step*/}
            {/*      </Button>*/}
            {/*    </SpaceBetween>*/}
            {/*  </Container>*/}
            {/*</div>*/}
          </Grid>
        </Box>
      </div>

      <Box padding={{ top: 'xxxl', horizontal: 's' }}>
        <Grid
          gridDefinition={[
            { colspan: { xl: 6, l: 5, s: 6, xxs: 10 }, offset: { l: 2, xxs: 1 } },
            { colspan: { xl: 2, l: 3, s: 4, xxs: 10 }, offset: { s: 0, xxs: 1 } },
          ]}
        >
          <SpaceBetween size="xxl">
            <div>
              <Box variant="h1" tagOverride="h2" padding={{ bottom: 's', top: 'n' }}>
                {/* Something something */}
              </Box>
            </div>
          </SpaceBetween>

          <div className={styles.sidebar}>
            {/*<SpaceBetween size="xxl">*/}
            {/*  <Container header={<Header>Something</Header>}>*/}
            {/*    Something*/}
            {/*  </Container>*/}
            {/*</SpaceBetween>*/}
          </div>
        </Grid>
      </Box>
    </Box>
  )
}