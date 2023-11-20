import { TopNavigationProps } from '@cloudscape-design/components/top-navigation';
import { useState } from 'react';
import { Pathname } from '../routes';
import useNavigateWithRef from '../common/useNavigateWithRef';

export default function useTopNavigation(): State {
  const navigate = useNavigateWithRef();
  const [isSettingsVisible, setIsSettingsVisible] = useState<boolean>(false);
  const [isFeedbackVisible, setIsFeedbackVisible] = useState<boolean>(false);

  function handleSettingsDismiss() {
    setIsSettingsVisible(false);
  }

  function handleFeedbackDismiss() {
    setIsFeedbackVisible(false);
  }

  const i18nStrings: TopNavigationProps.I18nStrings = {
    overflowMenuTriggerText: 'More',
    overflowMenuTitleText: 'All',
  };

  const identity: TopNavigationProps.Identity = {
    title: 'Drew Hanberry',
    href: Pathname.Home,
    onFollow: (event) => {
      event.preventDefault();
      navigate(Pathname.Home);
    },
  };

  const utilities: TopNavigationProps.Utility[] = [
    {
      type: 'button',
      text: 'Feedback',
      onClick() {
        setIsFeedbackVisible(true);
      },
    },
    {
      type: 'button',
      iconName: 'settings',
      title: 'Settings',
      onClick() {
        setIsSettingsVisible(true);
      },
    },
  ];

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
