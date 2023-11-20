import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import Container from '@cloudscape-design/components/container';
import FormField from '@cloudscape-design/components/form-field';
import Tiles from '@cloudscape-design/components/tiles';
import Grid from '@cloudscape-design/components/grid';
import Input from '@cloudscape-design/components/input';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Select from '@cloudscape-design/components/select';
import Box from '@cloudscape-design/components/box';

export default function CoffeeCalculator() {
  return (
    <ContentLayout header={<Header variant="h1">Coffee Calculator</Header>}>
      <Grid
        gridDefinition={[
          { colspan: { default: 12, s: 4 } },
          { colspan: { default: 12, s: 8 } },
        ]}
      >
        <Container header={<Header>Configuration</Header>}>
          <SpaceBetween size="l">
            <FormField label="Coffee strength">
              <Tiles
                columns={1}
                value="no"
                items={[
                  {
                    value: 'no',
                    label: 'Normal',
                    description:
                      '16:1 water-to-coffee ratio. Best for most coffees.',
                  },
                  {
                    value: 'yes',
                    label: 'Strong',
                    description:
                      '15:1 water-to-coffee ratio. Best for lighter roasts.',
                  },
                  {
                    value: 'nop',
                    label: 'Weak',
                    description:
                      '17:1 water-to-coffee ratio. Best for darker roasts.',
                  },
                ]}
              />
            </FormField>
            <FormField label="Coffee weight">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ maxWidth: '130px' }}>
                  <Input value="3" />
                </div>
                <Box padding={{ left: 'xs' }}>grams</Box>
              </div>
            </FormField>
          </SpaceBetween>
        </Container>

        <Container header={<Header>Test</Header>}></Container>
      </Grid>
    </ContentLayout>
  );
}
