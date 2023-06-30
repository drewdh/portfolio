import AppLayout from '@cloudscape-design/components/app-layout';
import Container from '@cloudscape-design/components/container';
import Form from '@cloudscape-design/components/form';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { useCallback, useMemo, useRef, useState } from 'react';
import { BreadcrumbGroupProps } from '@cloudscape-design/components/breadcrumb-group';
import Header from '@cloudscape-design/components/header';
import Button from '@cloudscape-design/components/button';
import { NonCancelableCustomEvent } from '@cloudscape-design/components';
import FormField from '@cloudscape-design/components/form-field';
import Input, { InputProps } from '@cloudscape-design/components/input';
import { useLocation } from 'react-router';

import DhSideNavigation from '../../common/side-navigation';
import Breadcrumbs from '../../common/Breadcrumbs';
import { Pathname } from '../../routes';
import useTitle from '../../useTitle';
import useLocalStorage, { LocalStorageKey } from '../../useLocalStorage';
import useNavigateWithRef from '../../common/useNavigateWithRef';

export default function SuggestedSigilTierSettings() {
  useTitle('Edit suggested sigil tier');
  const { state } = useLocation();
  const navigate = useNavigateWithRef();
  const inputRef = useRef<InputProps.Ref>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>();
  const [savedOffset, setSavedOffset] = useLocalStorage<number>(LocalStorageKey.DiabloMonsterLevelOffset, 3);
  const [offsetValue, setOffsetValue] = useState<string>(String(savedOffset));
  const [errorText, setErrorText] = useState<string | null>();

  const validate = useCallback((offsetNum: number): boolean => {
    if (isNaN(offsetNum)) {
      setErrorText('Offset must be a number.');
      return false;
    }
    if (Math.floor(offsetNum) !== offsetNum) {
      setErrorText('Offset must be a whole number.');
      return false;
    }
    if (offsetNum < 0) {
      setErrorText('Offset must be a positive integer.');
      return false;
    }
    setErrorText(null);
    return true;
  }, []);

  const handleCancel = useCallback((): void => {
    navigate(state?.ref ?? Pathname.Settings);
  }, [navigate, state]);

  const handleSave = useCallback((): void => {
    setIsSubmitted(true);
    const offsetNum = Number(offsetValue);
    const isValid = validate(offsetNum);
    if (!isValid) {
      inputRef.current?.focus();
      return;
    }
    setSavedOffset(offsetNum);
    navigate(state?.ref ?? Pathname.Settings);
  }, [state, navigate, offsetValue, setSavedOffset, validate]);

  const handleOffsetChange = useCallback((event: NonCancelableCustomEvent<InputProps.ChangeDetail>): void => {
    const { value: offset } = event.detail;
    setOffsetValue(offset);
    if (isSubmitted) {
      validate(Number(offset));
    }
  }, [isSubmitted, validate]);

  const breadcrumbItems = useMemo((): BreadcrumbGroupProps.Item[] => {
    return [
      { text: 'Settings', href: Pathname.Settings },
      { text: 'Edit suggested sigil tier', href: Pathname.DiabloSuggestedSigilTierSettings },
    ];
  }, []);

  return (
    <AppLayout
      breadcrumbs={<Breadcrumbs items={breadcrumbItems} />}
      navigation={<DhSideNavigation />}
      toolsHide
      contentType="form"
      content={
        <Form
          actions={
            <SpaceBetween size="xs" direction="horizontal">
              <Button onClick={handleCancel}>Cancel</Button>
              <Button onClick={handleSave} variant="primary">Save</Button>
            </SpaceBetween>
          }
          header={<Header variant="h1">Edit suggested sigil tier</Header>}
        >
          <Container header={<Header variant="h2">Edit suggested sigil tier</Header>}>
            <FormField
              label="Monster level offset"
              description="Difference between monster level and player level. The default is 3."
              errorText={errorText}
            >
              <Input
                ref={inputRef}
                value={offsetValue}
                onChange={handleOffsetChange}
                type="number"
                inputMode="numeric"
              />
            </FormField>
          </Container>
        </Form>
      }
    />
  );
}
