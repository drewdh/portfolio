import { ReactNode, Ref, useCallback, useContext, useMemo, useRef } from 'react';
import { useLocation, useMatches, useNavigate } from 'react-router';
import BreadcrumbGroup, { BreadcrumbGroupProps } from '@cloudscape-design/components/breadcrumb-group';
import { FlashbarProps } from '@cloudscape-design/components/flashbar';
import { SideNavigationProps } from '@cloudscape-design/components/side-navigation';
import { AppLayoutProps } from '@cloudscape-design/components/app-layout';

import { Handle } from '../index';
import { NotificationsContext } from './useNotifications';
import { Pathname } from '../routes';

export default function useAppLayout(): State {
  const appLayoutRef = useRef<AppLayoutProps.Ref>(null);
  const matches = useMatches();
  const { notifications } = useContext(NotificationsContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handle = useMemo((): Handle | undefined => {
    return matches.find((match) => {
      return match.handle && match.pathname === pathname;
    })?.handle as Handle;
  }, [matches, pathname]);

  const handleFollow = useCallback((event: CustomEvent<SideNavigationProps.FollowDetail>): void => {
    const { external, href } = event.detail;
    if (external) {
      return;
    }
    event.preventDefault();
    navigate(href);
    appLayoutRef.current?.closeNavigationIfNecessary();
  }, [navigate, appLayoutRef]);

  const handleBreadcrumbFollow = useCallback((event: CustomEvent<BreadcrumbGroupProps.ClickDetail>): void => {
    const { external, href } = event.detail;
    if (external) {
      return;
    }
    event.preventDefault();
    navigate(href);
  }, [navigate]);

  const breadcrumbItems = useMemo((): BreadcrumbGroupProps.Item[] => {
    return handle?.breadcrumbs ?? [];
  }, [handle]);

  const disableContentPaddings = useMemo((): boolean => {
    return handle?.disableContentPaddings ?? false;
  }, [handle]);

  const navigationHide = useMemo((): boolean => {
    return handle?.navigationHide ?? false;
  }, [handle]);

  const navigationItems = useMemo((): SideNavigationProps.Item[] => ([
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

  const contentType = useMemo((): AppLayoutProps.ContentType => {
    return handle?.contentType ?? 'default';
  }, [handle]);

  const renderBreadcrumbs = useCallback((): ReactNode => {
    if (!breadcrumbItems.length) {
      return null;
    }
    return (
      <BreadcrumbGroup onFollow={handleBreadcrumbFollow} items={breadcrumbItems} />
    );
  }, [handleBreadcrumbFollow, breadcrumbItems]);

  return {
    activeHref: pathname,
    appLayoutRef,
    contentType,
    disableContentPaddings,
    handleFollow,
    navigationHide,
    navigationItems,
    notifications,
    renderBreadcrumbs,
  };
}

interface State {
  activeHref: string;
  appLayoutRef: Ref<AppLayoutProps.Ref>;
  contentType: AppLayoutProps.ContentType;
  disableContentPaddings: boolean;
  handleFollow: (event: CustomEvent<SideNavigationProps.FollowDetail>) => void;
  navigationHide: boolean;
  navigationItems: SideNavigationProps.Item[];
  notifications: ReadonlyArray<FlashbarProps.MessageDefinition>;
  renderBreadcrumbs: () => ReactNode;
}
