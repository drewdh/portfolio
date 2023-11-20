import Header from '@cloudscape-design/components/header';
import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import FormField from '@cloudscape-design/components/form-field';
import Input from '@cloudscape-design/components/input';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Select from '@cloudscape-design/components/select';
import Alert from '@cloudscape-design/components/alert';
import { useState } from 'react';

import Feedback from '../../feedback/Feedback';

export default function PlayerStatistics() {
  const [isFeedbackModalVisible, setIsFeedbackModalVisible] =
    useState<boolean>(false);

  return (
    <SpaceBetween size="l">
      <Alert
        type="info"
        action={
          <Button onClick={() => setIsFeedbackModalVisible(true)}>
            Send feedback
          </Button>
        }
      >
        This widget is static. BattleTag search does not work, and all data is
        hard-coded. If you would use a functioning version of this widget, send
        feedback and let me know.
      </Alert>
      <Grid
        gridDefinition={[
          { colspan: { default: 12, s: 3 } },
          { colspan: { default: 12, s: 9 } },
        ]}
      >
        <Container header={<Header>Search</Header>}>
          <SpaceBetween size="l">
            <FormField label="BattleTag">
              <Input type="search" value="andahan#1607" />
            </FormField>
            <Box float="right">
              <Button>Load characters</Button>
            </Box>
            <FormField label="Character">
              <Select
                selectedOption={{
                  value: 'Andahan',
                  label: 'Andahan',
                  description: 'Necromancer',
                  labelTag: 'Level 73',
                }}
                triggerVariant="option"
                options={[
                  {
                    value: 'Andahan',
                    label: 'Andahan',
                    description: 'Necromancer',
                    labelTag: 'Level 73',
                  },
                  {
                    value: 'LaQuisha',
                    label: 'LaQuisha',
                    description: 'Sorcerer',
                    labelTag: 'Level 21',
                  },
                  {
                    value: 'Viktor',
                    label: 'Viktor',
                    description: 'Necromancer',
                    labelTag: 'Level 1',
                  },
                  {
                    value: 'Barbie',
                    label: 'Barbie',
                    description: 'Barbarian',
                    labelTag: 'Level 1',
                  },
                ]}
              />
            </FormField>
          </SpaceBetween>
        </Container>
        <SpaceBetween size="l">
          <Header
            variant="h1"
            headingTagOverride="h2"
            actions={
              <div
                style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
              >
                <Box variant="small">Updated 5 minutes ago</Box>
                <Button iconName="refresh" />
              </div>
            }
          >
            Andahan details
          </Header>
          <Container header={<Header>Character statistics</Header>}>
            <ColumnLayout columns={4} variant="text-grid">
              <SpaceBetween size="l">
                <div>
                  <Box variant="awsui-key-label">Player level</Box>
                  <div>Level 73</div>
                </div>
                <div>
                  <Box variant="awsui-key-label">Class</Box>
                  <div>Necromancer</div>
                </div>
                <div>
                  <Box variant="awsui-key-label">Time played</Box>
                  <div>121 hours</div>
                </div>
              </SpaceBetween>
              <SpaceBetween size="l">
                <div>
                  <Box variant="awsui-key-label">Hardcore mode</Box>
                  <div>No</div>
                </div>
                <div>
                  <Box variant="awsui-key-label">Player alive</Box>
                  <div>Yes</div>
                </div>
                <div>
                  <Box variant="awsui-key-label">Player last seen</Box>
                  <div>4 hours ago</div>
                </div>
              </SpaceBetween>
              <SpaceBetween size="l">
                <div>
                  <Box variant="awsui-key-label">World Tier</Box>
                  <div>4</div>
                </div>
                <div>
                  <Box variant="awsui-key-label">Power</Box>
                  <div>773</div>
                </div>
                <div>
                  <Box variant="awsui-key-label">Gold collected</Box>
                  <div>12,766,694</div>
                </div>
              </SpaceBetween>
              <SpaceBetween size="l">
                <div>
                  <Box variant="awsui-key-label">Monsters killed</Box>
                  <div>67,930</div>
                </div>
                <div>
                  <Box variant="awsui-key-label">Elites killed</Box>
                  <div>2,927</div>
                </div>
                <div>
                  <Box variant="awsui-key-label">Players killed</Box>
                  <div>0</div>
                </div>
              </SpaceBetween>
            </ColumnLayout>
          </Container>
          <Container header={<Header>Skills</Header>}>
            <SpaceBetween size="l">
              <div>
                <Box variant="awsui-key-label">Equipped skills</Box>
                <div>Decompose</div>
                <div>Blight</div>
                <div>Raise Skeleton</div>
                <div>Corpse Explosion</div>
                <div>Corpse Tendrils</div>
                <div>Army of the Dead</div>
              </div>
            </SpaceBetween>
          </Container>
        </SpaceBetween>
      </Grid>
      <Feedback
        isVisible={isFeedbackModalVisible}
        onDismiss={() => setIsFeedbackModalVisible(false)}
      />
    </SpaceBetween>
  );
}
