import AppLayoutToolbar, {
  AppLayoutToolbarProps,
} from '@cloudscape-design/components/app-layout-toolbar';
import Box from '@cloudscape-design/components/box';
import Popover from '@cloudscape-design/components/popover';
import { forwardRef, Ref, useEffect, useRef } from 'react';
import Flashbar from '@cloudscape-design/components/flashbar';
import { useLocation } from 'react-router';
import SideNavigation, { SideNavigationProps } from '@cloudscape-design/components/side-navigation';
import { ButtonProps } from '@cloudscape-design/components/button';

import { footerSelector } from '../footer/constants';
import { topNavSelector } from '../top-navigation/constants';
import { useNotifications } from 'common/use-notifications';
import { Pathname } from 'utilities/routes';
import { apps } from 'common/apps';
import useFollow from 'common/use-follow';

function PreviewPopover() {
  return (
    <Box color="text-status-info" display="inline">
      <Popover
        header="Preview app"
        size="medium"
        triggerType="text"
        content="This app is in preview. Functionality is limited and can change at any time."
        renderWithPortal={true}
      >
        <Box color="text-status-info" fontSize="body-s" fontWeight="bold">
          Preview
        </Box>
      </Popover>
    </Box>
  );
}

const Layout = forwardRef(function DhAppLayout(props: Props, ref: Ref<AppLayoutToolbarProps.Ref>) {
  const notifications = useNotifications((state) => state.notifications);
  const setNotifications = useNotifications((state) => state.setNotifications);
  const previousPathname = useRef<string | null>(null);
  const { pathname } = useLocation();
  const follow = useFollow();

  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    const nextNotifications = notifications
      .filter(
        ({ persistOnNavigate }) => persistOnNavigate === 'always' || persistOnNavigate === 'once'
      )
      .map((item) => {
        return {
          ...item,
          persistOnNavigate: item.persistOnNavigate === 'once' ? 'never' : item.persistOnNavigate,
        };
      });
    setNotifications(nextNotifications);
  }, [setNotifications, pathname, notifications]);

  function handleFollow(
    event: CustomEvent<SideNavigationProps.FollowDetail | ButtonProps.FollowDetail>
  ) {
    const { href } = event.detail;
    if (!href) {
      return;
    }
    follow({ href, event });
  }

  const navItems: SideNavigationProps.Item[] = apps.map((app) => {
    return {
      type: 'link',
      text: app.title,
      href: app.href,
      info: app.isPreview ? <PreviewPopover /> : null,
    };
  });

  return (
    <AppLayoutToolbar
      {...props}
      ref={ref}
      notifications={<Flashbar items={notifications} />}
      footerSelector={footerSelector}
      headerSelector={topNavSelector}
      navigation={
        <SideNavigation
          activeHref={pathname}
          onFollow={handleFollow}
          header={{ href: Pathname.Home, text: 'Apps' }}
          items={navItems}
        />
      }
    />
  );
});

export default forwardRef(function (props: Props, ref: Ref<AppLayoutToolbarProps.Ref>) {
  return <Layout {...props} ref={ref} />;
});

type Props = Omit<
  AppLayoutToolbarProps,
  'footerSelector' | 'headerSelector' | 'notifications' | 'navigation' | 'navigationWidth'
>;
