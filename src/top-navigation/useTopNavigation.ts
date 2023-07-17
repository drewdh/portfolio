import { TopNavigationProps } from '@cloudscape-design/components/top-navigation';
import { useCallback, useMemo, useState } from 'react';
import { Pathname } from '../routes';
import useNavigateWithRef from '../common/useNavigateWithRef';

export default function useTopNavigation(): State {
  const navigate = useNavigateWithRef();
  const [isSettingsVisible, setIsSettingsVisible] = useState<boolean>(false);
  const [isFeedbackVisible, setIsFeedbackVisible] = useState<boolean>(false);

  const handleSettingsDismiss = useCallback((): void => {
    setIsSettingsVisible(false);
  }, []);

  const handleFeedbackDismiss = useCallback((): void => {
    setIsFeedbackVisible(false);
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

  const handleFeedbackClick = useCallback((): void => {
    setIsFeedbackVisible(true);
  }, []);

  const utilities = useMemo((): TopNavigationProps.Utility[] => {
    return [
      {
        type: 'button',
        text: 'Feedback',
        onClick: handleFeedbackClick,
      },
      {
        type: 'button',
        iconName: 'settings',
        title: 'Settings',
        onClick: handleSettingsClick,
      },
    ];
  }, [handleFeedbackClick, handleSettingsClick]);

  return {
    isFeedbackVisible,
    handleFeedbackDismiss,
    handleSettingsDismiss,
    i18nStrings,
    identity,
    isSettingsVisible,
    utilities,
  };
}

interface State {
  handleFeedbackDismiss: () => void;
  handleSettingsDismiss: () => void;
  i18nStrings: TopNavigationProps.I18nStrings;
  identity: TopNavigationProps.Identity;
  isFeedbackVisible: boolean;
  isSettingsVisible: boolean;
  utilities: TopNavigationProps.Utility[];
}
