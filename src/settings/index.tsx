import { useCallback, useEffect, useMemo, useState } from 'react';
import Modal from '@cloudscape-design/components/modal';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Button from '@cloudscape-design/components/button';
import FormField from '@cloudscape-design/components/form-field';
import RadioGroup, { RadioGroupProps } from '@cloudscape-design/components/radio-group';
import { NonCancelableCustomEvent } from '@cloudscape-design/components';

import { Appearance, SettingsValues } from './types';
import { handleMatchChange, setAppearance } from './utilities';
import useLocalStorage, { LocalStorageKey } from '../useLocalStorage';
import { defaultSettings } from './constants';

let isInitialized = false;
type RadioChangeEvent = NonCancelableCustomEvent<RadioGroupProps.ChangeDetail>;

export default function Settings({ onDismiss, visible }: Props) {
  const { getItem, setItem } = useLocalStorage<SettingsValues>({ defaultValue: defaultSettings, key: LocalStorageKey.GlobalSettings });
  const [settings, setSettings] = useState<SettingsValues>(getItem());
  const [match] = useState(window.matchMedia('(prefers-color-scheme: dark)'));

  useEffect(function initializeAppearance() {
    if (isInitialized) {
      return;
    }
    if (settings.appearance === Appearance.Automatic) {
      return setAppearance(match.matches ? Appearance.Dark : Appearance.Light);
    }
    setAppearance(settings.appearance);
  }, [match, settings]);

  useEffect(function syncToLocalStorage() {
    setItem(settings);
  }, [setItem, settings]);

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
