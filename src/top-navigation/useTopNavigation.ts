import { TopNavigationProps } from '@cloudscape-design/components/top-navigation';
import { useCallback, useMemo, useState } from 'react';
import { Pathname } from '../routes';
import useNavigateWithRef from '../common/useNavigateWithRef';

export default function useTopNavigation(): State {
  const navigate = useNavigateWithRef();
  const [isSettingsVisible, setIsSettingsVisible] = useState<boolean>(false);

  const handleSettingsDismiss = useCallback((): void => {
    setIsSettingsVisible(false);
  }, []);

  const i18nStrings = useMemo((): TopNavigationProps.I18nStrings => ({
    overflowMenuTriggerText: 'More',
    overflowMenuTitleText: 'All',
  }), []);

  const identity = useMemo((): TopNavigationProps.Identity => ({
    title: 'Drew Hanberry',
    href: Pathname.Home,
    onFollow: (event) => {
      event.preventDefault();
      navigate(Pathname.Home);
    },
  }), [navigate]);

  const handleSettingsClick = useCallback((): void => {
    setIsSettingsVisible(true);
  }, []);

  const utilities = useMemo((): TopNavigationProps.Utility[] => {
    return [
      {
        type: 'button',
        iconName: 'settings',
        title: 'Settings',
        onClick: handleSettingsClick,
      },
    ];
  }, [handleSettingsClick]);

  return {
    handleSettingsDismiss,
    i18nStrings,
    identity,
    isSettingsVisible,
    utilities,
  };
}

interface State {
  handleSettingsDismiss: () => void;
  i18nStrings: TopNavigationProps.I18nStrings;
  identity: TopNavigationProps.Identity;
  isSettingsVisible: boolean;
  utilities: TopNavigationProps.Utility[];
}
