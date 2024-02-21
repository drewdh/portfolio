import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Icon from '@cloudscape-design/components/icon';
import { faHeat } from '@fortawesome/pro-solid-svg-icons/faHeat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { colorTextStatusWarning } from '@cloudscape-design/design-tokens';
import Table from '@cloudscape-design/components/table';
import React, { useEffect } from 'react';
import Link from '@cloudscape-design/components/link';
import Button from '@cloudscape-design/components/button';

import widgetDetails from '../../common/widgetDetails';
import useEcobee from './useEcobee';
import useAddNotification from '../../common/app-layout/use-add-notification';

export default function Ecobee() {
  const { handleRefresh, isFetching } = useEcobee();
  const addNotification = useAddNotification();

  useEffect((): void => {
    addNotification({
      id: 'ecobeePreview',
      header: 'Prototype app',
      content: 'This app is a prototype for demo purposes and does not use live data.',
      dismissible: false,
      type: 'info',
    });
  }, [addNotification]);

  return (
    <ContentLayout
      header={
        <Header
          variant="h1"
          description={widgetDetails.ecobee.description}
          actions={
            <SpaceBetween size="xs" direction="horizontal" alignItems="center">
              <Button loading={isFetching} onClick={handleRefresh} iconName="refresh" />
              <Box variant="small" color="text-status-inactive">
                {isFetching ? 'Updating...' : 'Updated 3 minutes ago'}
              </Box>
            </SpaceBetween>
          }
        >
          {widgetDetails.ecobee.title}
        </Header>
      }
    >
      <Grid
        gridDefinition={[
          { colspan: { l: 5, m: 5, default: 12 } },
          { colspan: { l: 3, m: 3, default: 12 } },
          { colspan: { l: 4, m: 4, default: 12 } },
          { colspan: { l: 6, m: 6, default: 12 } },
          { colspan: { l: 6, m: 6, default: 12 } },
          { colspan: { l: 6, m: 6, default: 12 } },
          { colspan: { l: 6, m: 6, default: 12 } },
          { colspan: { l: 6, m: 6, default: 12 } },
          { colspan: { l: 8, m: 8, default: 12 } },
          { colspan: { l: 4, m: 4, default: 12 } },
        ]}
      >
        <Container header={<Header>System status</Header>}>
          <ColumnLayout variant="text-grid" columns={2}>
            <SpaceBetween size="l">
              <div>
                <Box variant="awsui-key-label">Indoor temperature</Box>
                <Box variant="awsui-value-large">68.4º</Box>
              </div>
              <div>
                <Box variant="awsui-key-label">Indoor humidity</Box>
                <span>45%</span>
              </div>
              <div>
                <Box variant="awsui-key-label">Indoor air quality</Box>
                <span>Clean</span>
              </div>
            </SpaceBetween>
            <SpaceBetween size="l">
              <div>
                <Box variant="awsui-key-label">Status</Box>
                <div style={{ color: colorTextStatusWarning }}>
                  <SpaceBetween direction="horizontal" size="xxs">
                    <Icon svg={<FontAwesomeIcon icon={faHeat} />} />
                    Heating
                  </SpaceBetween>
                </div>
              </div>
              <div>
                <Box variant="awsui-key-label">Temperature set point</Box>
                <span>69º</span>
              </div>
              <div>
                <Box variant="awsui-key-label">Mode</Box>
                <span>Heat</span>
              </div>
            </SpaceBetween>
          </ColumnLayout>
        </Container>
        <Container header={<Header description="Seattle, WA">Current conditions</Header>}>
          <SpaceBetween size="l">
            <div>
              <Box variant="awsui-key-label">Temperature</Box>
              <span>34º</span>
            </div>
            <div>
              <Box variant="awsui-key-label">Humidity</Box>
              <span>25%</span>
            </div>
            <div>
              <Box variant="awsui-key-label">Air quality</Box>
              <span>Fair</span>
            </div>
          </SpaceBetween>
        </Container>
        <Table
          columnDefinitions={[
            {
              id: '',
              header: 'Name',
              cell: () => 'Living Room',
            },
            {
              id: 'temp',
              header: 'Temperature',
              cell: () => '69º',
            },
            {
              id: 'occupied',
              header: 'Occupied',
              cell: () => 'Occupied',
            },
            {
              id: 'status',
              header: 'Status',
              cell: () => 'Not in use',
            },
          ]}
          header={<Header counter="(2)">Sensors</Header>}
          footer={
            <Box textAlign="center">
              <Link href="#">View all</Link>
            </Box>
          }
          items={[{}, {}]}
        />
        <Container header={<Header>Sensors</Header>}></Container>
      </Grid>
    </ContentLayout>
  );
}
