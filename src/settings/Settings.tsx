import { useCallback, useEffect, useMemo, useState } from 'react';
import Modal from '@cloudscape-design/components/modal';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import FormField from '@cloudscape-design/components/form-field';
import RadioGroup, { RadioGroupProps } from '@cloudscape-design/components/radio-group';
import { NonCancelableCustomEvent } from '@cloudscape-design/components';

import { Appearance, SettingsValues } from './types';
import { handleMatchChange, setAppearance } from '../widgets/timer/settings-modal/utilities';

type RadioChangeEvent = NonCancelableCustomEvent<RadioGroupProps.ChangeDetail>;

export function Settings({ onDismiss, visible }: Props) {
  const [settings, setSettings] = useState<SettingsValues>({ appearance: Appearance.Automatic });
  const [match] = useState(window.matchMedia('(prefers-color-scheme: dark)'));

  const updateSettings = useCallback((updatedSettings: Partial<SettingsValues>) => {
    setSettings((prevState) => ({
      ...prevState,
      ...updateSettings,
    }));
    // TODO: Update local storage
  }, []);

  const appearanceItems = useMemo((): RadioGroupProps.RadioButtonDefinition[] => {
    return [
      {
        label: 'System default',
        value: Appearance.Automatic,
      },
      {
        label: 'Dark',
        value: Appearance.Dark,
      },
      {
        label: 'Light',
        value: Appearance.Light,
      },
    ];
  }, []);

  // Clean up dark mode listener
  useEffect((): (() => void) => {
    return () => {
      match.removeEventListener('change', handleMatchChange);
    }
  }, [match]);

  const handleAppearanceChange = useCallback((event: RadioChangeEvent): void => {
    const appearance = event.detail.value as Appearance;
    setSettings((prevState) => ({
      ...prevState,
      appearance,
    }));
    if (appearance === Appearance.Automatic) {
      match.addEventListener('change', handleMatchChange);
      setAppearance(match.matches ? Appearance.Dark : Appearance.Light);
    } else {
      match.removeEventListener('change', handleMatchChange);
      setAppearance(appearance);
    }
  }, [match]);

  return (
    <Modal
      header="Settings"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="primary" onClick={onDismiss}>Done</Button>
          </SpaceBetween>
        </Box>
      }
      visible={visible}
      onDismiss={onDismiss}
    >
      <SpaceBetween size="l">
        <FormField label="Appearance">
          <RadioGroup
            onChange={handleAppearanceChange}
            value={settings.appearance}
            items={appearanceItems}
          />
        </FormField>
      </SpaceBetween>
    </Modal>
  );
}

interface Props {
  visible: boolean;
  onDismiss: () => void;
}