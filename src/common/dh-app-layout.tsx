import AppLayout, { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import { forwardRef, Ref, useEffect, useRef } from 'react';
import Flashbar from '@cloudscape-design/components/flashbar';
import { useLocation } from 'react-router';
import SideNavigation, { SideNavigationProps } from '@cloudscape-design/components/side-navigation';
import { ButtonProps } from '@cloudscape-design/components/button';

import { footerSelector } from '../footer/constants';
import { topNavSelector } from '../top-navigation/constants';
import { useNotifications } from 'common/use-notifications';
import { Pathname } from 'utilities/routes';
import widgetDetails from 'common/widget-details';
import useFollow from 'common/use-follow';
import Box from '@cloudscape-design/components/box';
import Popover from '@cloudscape-design/components/popover';

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

const Layout = forwardRef(function DhAppLayout(props: Props, ref: Ref<AppLayoutProps.Ref>) {
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

  return (
    <AppLayout
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
          items={[
            {
              type: 'link',
              text: widgetDetails.twitch.title,
              href: Pathname.Twitch,
            },
            {
              type: 'link',
              text: widgetDetails.ecobee.title,
              href: Pathname.Ecobee,
              info: <PreviewPopover />,
            },
            { type: 'link', text: widgetDetails.diablo.title, href: Pathname.Diablo },
            { type: 'link', text: widgetDetails.owProgress.title, href: Pathname.OwProgress },
          ]}
        />
      }
    />
  );
});

export default forwardRef(function (props: Props, ref: Ref<AppLayoutProps.Ref>) {
  return <Layout {...props} ref={ref} />;
});

type Props = Omit<
  AppLayoutProps,
  'footerSelector' | 'headerSelector' | 'notifications' | 'navigation' | 'navigationWidth'
>;
