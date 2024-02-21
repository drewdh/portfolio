import { TopNavigationProps } from '@cloudscape-design/components/top-navigation';
import { useState } from 'react';

import { Pathname } from '../routes';
import useNavigateWithRef from '../common/useNavigateWithRef';
import useGetCurrentUser from '../auth/use-get-current-user';
import useSignOut from '../auth/use-sign-out';

export default function useTopNavigation(): State {
  const navigate = useNavigateWithRef();
  const [isSettingsVisible, setIsSettingsVisible] = useState<boolean>(false);

  const { isLoading: isLoadingUser, data: currentUser } = useGetCurrentUser();
  console.log(currentUser);
  const { mutate: signOut } = useSignOut();

  function handleSettingsDismiss() {
    setIsSettingsVisible(false);
  }

  const i18nStrings: TopNavigationProps.I18nStrings = {
    overflowMenuTriggerText: 'More',
    overflowMenuTitleText: 'All',
  };

  const identity: TopNavigationProps.Identity = {
    title: 'DH',
    href: Pathname.Home,
    onFollow: (event) => {
      event.preventDefault();
      navigate(Pathname.Home);
    },
  };

  const utilities: TopNavigationProps.Utility[] = [
    {
      type: 'button',
      iconName: 'settings',
      title: 'Settings',
      onClick() {
        setIsSettingsVisible(true);
      },
    },
  ];

  if (!isLoadingUser && currentUser) {
    utilities.push({
      type: 'button',
      text: 'Sign out',
      onClick: () => signOut(),
    });
  } else if (!isLoadingUser && !currentUser) {
    utilities.push({
      type: 'button',
      text: 'Sign in',
      href: Pathname.Signin,
    });
  }

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
