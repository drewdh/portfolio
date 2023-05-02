import { useMemo } from 'react';
import { FlashbarProps } from '@cloudscape-design/components/flashbar';

import useLocalStorage, { LocalStorageKey } from './useLocalStorage';

export default function usePreviewNotification(): FlashbarProps.MessageDefinition | undefined {
  const {
    getItem: getIsDismissed,
    setItem: saveIsDismissed,
  } = useLocalStorage<boolean>({
    defaultValue: false,
    key: LocalStorageKey.IsPreviewNotificationDismissed,
  });

  // const isDismissed = useMemo((): boolean => {
  //   return getIsDismissed();
  // }, [getIsDismissed]);

  return useMemo((): FlashbarProps.MessageDefinition | undefined => {
    // TODO: Check for dismissal if more pages added
    // if (isDismissed) {
    //   return;
    // }
    const content = 'This site is under development. Some features might not work as expected.';
    return {
      content,
      dismissible: false,
      onDismiss: () => saveIsDismissed(true),
    };
  }, [saveIsDismissed]);
}
