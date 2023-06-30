import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import Container from '@cloudscape-design/components/container';
import Box from '@cloudscape-design/components/box';
import useLocalStorage, { LocalStorageKey } from '../../useLocalStorage';
import ButtonLink from '../../common/ButtonLink';
import { Pathname } from '../../routes';
import SpaceBetween from '@cloudscape-design/components/space-between';
import useTitle from '../../useTitle';
import ColumnLayout from '@cloudscape-design/components/column-layout';

export default function Settings() {
  useTitle('Settings');
  const [monsterLevelOffset] = useLocalStorage<number>(LocalStorageKey.DiabloMonsterLevelOffset, 3);
  const [contentDensity] = useLocalStorage<string>(LocalStorageKey.ContentDensity, 'comfortable');
  const [visualMode] = useLocalStorage<string>(LocalStorageKey.VisualMode, 'default');
  const contentDensityLabel = contentDensity === 'comfortable' ? 'Comfortable' : 'Compact';
  const visualModeLabel = visualMode === 'default' ? 'Browser default' : visualMode === 'light' ? 'Light' : 'Dark';

  return (
    <ContentLayout
      header={<Header variant="h1" description="View and edit settings for the site. Changes are only saved for this device.">Settings</Header>}
    >
      <SpaceBetween size="l">
        {/*<Container*/}
        {/*  header={<Header actions={<ButtonLink href={Pathname.SettingsDisplay}>Edit</ButtonLink>}>Display</Header>}*/}
        {/*>*/}
        {/*  <ColumnLayout columns={2} variant="text-grid">*/}
        {/*    <div>*/}
        {/*      <Box variant="awsui-key-label">Visual mode</Box>*/}
        {/*      <Box>{visualModeLabel}</Box>*/}
        {/*    </div>*/}
        {/*    <div>*/}
        {/*      <Box variant="awsui-key-label">Content density</Box>*/}
        {/*      <Box>{contentDensityLabel}</Box>*/}
        {/*    </div>*/}
        {/*  </ColumnLayout>*/}
        {/*</Container>*/}
        <Container
          header={<Header actions={<ButtonLink href={Pathname.DiabloSuggestedSigilTierSettings}>Edit</ButtonLink>}>Suggested sigil tier</Header>}
        >
          <Box variant="awsui-key-label">Monster level offset</Box>
          <Box>{monsterLevelOffset}</Box>
        </Container>
      </SpaceBetween>
    </ContentLayout>
  );
}