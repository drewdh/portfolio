import AppLayout from '@cloudscape-design/components/app-layout';
import { BreadcrumbGroupProps } from '@cloudscape-design/components/breadcrumb-group';
import Header from '@cloudscape-design/components/header';
import Container from '@cloudscape-design/components/container';
import SpaceBetween from '@cloudscape-design/components/space-between';
import FormField from '@cloudscape-design/components/form-field';
import Tiles, { TilesProps } from '@cloudscape-design/components/tiles';

import Breadcrumbs from '../../common/Breadcrumbs';
import { Pathname } from '../../routes';
import useTitle from '../../useTitle';
import useLocalStorage, { LocalStorageKey } from '../../useLocalStorage';
import { useCallback, useState } from 'react';
import { NonCancelableCustomEvent } from '@cloudscape-design/components';
import Form from '@cloudscape-design/components/form';
import Button from '@cloudscape-design/components/button';
import ButtonLink from '../../common/ButtonLink';
import useNavigateWithRef from '../../common/useNavigateWithRef';
import RadioGroup, {
  RadioGroupProps,
} from '@cloudscape-design/components/radio-group';

enum ContentDensity {
  Comfortable = 'comfortable',
  Compact = 'compact',
}
enum VisualMode {
  Default = 'default',
  Light = 'light',
  Dark = 'dark',
}
const breadcrumbs: BreadcrumbGroupProps.Item[] = [
  { text: 'Settings', href: Pathname.Settings },
  { text: 'Edit display', href: Pathname.SettingsDisplay },
];
const densityItems: TilesProps.TilesDefinition[] = [
  {
    value: ContentDensity.Comfortable,
    description: 'Default spacing that optimizes information consumption.',
    label: 'Comfortable',
  },
  {
    value: ContentDensity.Compact,
    description: 'Reduced spacing that provides more visibility over content.',
    label: 'Compact',
  },
];
const visualModeItems: RadioGroupProps.RadioButtonDefinition[] = [
  {
    value: VisualMode.Default,
    label: 'Browser default',
  },
  {
    value: VisualMode.Light,
    label: 'Light',
  },
  {
    value: VisualMode.Dark,
    label: 'Dark',
  },
];

export default function Display() {
  useTitle('Edit display');
  const navigate = useNavigateWithRef();
  const [savedContentDensity, setSavedContentDensity] =
    useLocalStorage<ContentDensity>(
      LocalStorageKey.ContentDensity,
      ContentDensity.Comfortable
    );
  const [savedVisualMode, setSavedVisualMode] = useLocalStorage<VisualMode>(
    LocalStorageKey.VisualMode,
    VisualMode.Default
  );
  const [visualMode, setVisualMode] = useState<VisualMode>(savedVisualMode);
  const [contentDensity, setContentDensity] =
    useState<ContentDensity>(savedContentDensity);

  const handleDensityChange = useCallback(
    (event: NonCancelableCustomEvent<TilesProps.ChangeDetail>): void => {
      setContentDensity(event.detail.value as ContentDensity);
    },
    []
  );

  const handleVisualModeChange = useCallback(
    (event: NonCancelableCustomEvent<RadioGroupProps.ChangeDetail>): void => {
      setVisualMode(event.detail.value as VisualMode);
    },
    []
  );

  const handleSave = useCallback((): void => {
    setSavedContentDensity(contentDensity);
    setSavedVisualMode(visualMode);
    navigate(Pathname.Settings);
  }, [
    contentDensity,
    navigate,
    setSavedContentDensity,
    setSavedVisualMode,
    visualMode,
  ]);

  return (
    <AppLayout
      content={
        <Form
          actions={
            <SpaceBetween size="xs" direction="horizontal">
              <ButtonLink href={Pathname.Settings}>Cancel</ButtonLink>
              <Button onClick={handleSave} variant="primary">
                Save
              </Button>
            </SpaceBetween>
          }
          header={<Header variant="h1">Edit display</Header>}
        >
          <SpaceBetween size="l">
            <Container header={<Header>Visual mode</Header>}>
              <FormField label="Visual mode">
                <RadioGroup
                  onChange={handleVisualModeChange}
                  value={visualMode}
                  items={visualModeItems}
                />
              </FormField>
            </Container>
            <Container header={<Header>Content density</Header>}>
              <FormField label="Content density">
                <Tiles
                  value={contentDensity}
                  onChange={handleDensityChange}
                  columns={2}
                  items={densityItems}
                />
              </FormField>
            </Container>
          </SpaceBetween>
        </Form>
      }
      breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
      toolsHide
      navigationHide
    />
  );
}
