import { useLocation, useNavigate } from 'react-router';
import { SideNavigationProps } from '@cloudscape-design/components/side-navigation';
import { useCallback, useMemo } from 'react';

import { Pathname } from '../routes';

export default function useSideNavigation(): State {
  const { pathname: activeHref } = useLocation();
  const navigate = useNavigate();

  const handleFollow = useCallback((event: CustomEvent<SideNavigationProps.FollowDetail>): void => {
    const { external, href } = event.detail;
    if (external) {
      return;
    }
    event.preventDefault();
    navigate(href);
  }, [navigate]);

  const items = useMemo((): SideNavigationProps.Item[] => ([
    {
      type: 'link',
      text: 'Home',
      href: Pathname.Home,
    },
    {
      type: 'link',
      text: 'Pomodoro timer',
      href: Pathname.PomodoroTimer,
    },
    { type: 'divider' },
    {
      type: 'link',
      text: 'LinkedIn',
      external: true,
      href: 'https://www.linkedin.com/in/drew-hanberry-b56264105/',
    },
  ]), []);

  return {
    activeHref,
    handleFollow,
    items,
  };
}

interface State {
  activeHref: string;
  handleFollow: (event: CustomEvent<SideNavigationProps.FollowDetail>) => void;
  items: SideNavigationProps.Item[];
}
