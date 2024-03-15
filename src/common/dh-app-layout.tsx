import AppLayout, { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import { forwardRef, Ref, useContext } from 'react';
import Flashbar from '@cloudscape-design/components/flashbar';
import { useLocation } from 'react-router';
import SideNavigation, { SideNavigationProps } from '@cloudscape-design/components/side-navigation';
import { ButtonProps } from '@cloudscape-design/components/button';

import { footerSelector } from '../footer/constants';
import { topNavSelector } from '../top-navigation/constants';
import { NotificationsContext, NotificationsProvider } from 'common/internal/notifications';
import { Pathname } from 'utilities/routes';
import widgetDetails from 'common/widget-details';
import useFollow from 'common/use-follow';

const Layout = forwardRef(function DhAppLayout(props: Props, ref: Ref<AppLayoutProps.Ref>) {
  const notifications = useContext(NotificationsContext);
  const { pathname } = useLocation();
  const follow = useFollow();

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
      notifications={<Flashbar items={notifications?.items ?? []} />}
      footerSelector={footerSelector}
      headerSelector={topNavSelector}
      navigation={
        <SideNavigation
          activeHref={pathname}
          onFollow={handleFollow}
          header={{ href: Pathname.Home, text: 'Apps' }}
          items={[
            { type: 'link', text: widgetDetails.twitch.title, href: Pathname.Twitch },
            { type: 'link', text: widgetDetails.ecobee.title, href: Pathname.Ecobee },
            { type: 'link', text: widgetDetails.diablo.title, href: Pathname.Diablo },
            { type: 'link', text: widgetDetails.feedback.title, href: Pathname.Feedback },
          ]}
        />
      }
    />
  );
});

export default forwardRef(function (props: Props, ref: Ref<AppLayoutProps.Ref>) {
  return (
    <NotificationsProvider>
      <Layout {...props} ref={ref} />
    </NotificationsProvider>
  );
});

type Props = Omit<
  AppLayoutProps,
  'footerSelector' | 'headerSelector' | 'notifications' | 'navigation' | 'navigationWidth'
>;
