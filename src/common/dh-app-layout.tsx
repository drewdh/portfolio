import AppLayout, { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import { forwardRef, Ref, useContext, useState } from 'react';
import Flashbar from '@cloudscape-design/components/flashbar';
import { useLocation } from 'react-router';
import SideNavigation, { SideNavigationProps } from '@cloudscape-design/components/side-navigation';
import ButtonDropdown, { ButtonDropdownProps } from '@cloudscape-design/components/button-dropdown';

import { footerSelector } from '../footer/constants';
import { topNavSelector } from '../top-navigation/constants';
import { NotificationsContext, NotificationsProvider } from 'common/internal/notifications';
import { Pathname } from 'utilities/routes';
import widgetDetails from 'common/widget-details';
import useFollow from 'common/use-follow';
import styles from './internal/side-navigation.module.scss';
import { NonCancelableCustomEvent } from '@cloudscape-design/components';
import Settings from '../settings/settings';
import Feedback from '../feedback/feedback';
import { ButtonProps } from '@cloudscape-design/components/button';

enum ProfileMenuId {
  Settings = 'settings',
  Feedback = 'feedback',
}

const Layout = forwardRef(function DhAppLayout(props: Props, ref: Ref<AppLayoutProps.Ref>) {
  const [isFeedbackVisible, setIsFeedbackVisible] = useState<boolean>(false);
  const [isSettingsVisible, setIsSettingsVisible] = useState<boolean>(false);
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

  function handleProfileItemClick(
    event: NonCancelableCustomEvent<ButtonDropdownProps.ItemClickDetails>
  ) {
    const { id } = event.detail;
    if (id === ProfileMenuId.Settings) {
      setIsSettingsVisible(true);
    } else if (id === ProfileMenuId.Feedback) {
      setIsFeedbackVisible(true);
    }
  }

  return (
    <>
      <AppLayout
        {...props}
        ref={ref}
        notifications={<Flashbar items={notifications?.items ?? []} />}
        footerSelector={footerSelector}
        headerSelector={topNavSelector}
        navigation={
          <>
            <SideNavigation
              activeHref={pathname}
              onFollow={handleFollow}
              header={{ href: Pathname.Home, text: 'DH' }}
              items={[
                {
                  type: 'expandable-link-group',
                  text: 'Apps',
                  href: Pathname.Home,
                  items: [
                    { type: 'link', text: widgetDetails.twitch.title, href: '/twitch/skiesti' },
                    { type: 'link', text: widgetDetails.ecobee.title, href: Pathname.Ecobee },
                    { type: 'link', text: widgetDetails.diablo.title, href: Pathname.Diablo },
                    { type: 'link', text: widgetDetails.feedback.title, href: Pathname.Feedback },
                  ],
                  defaultExpanded: true,
                },
              ]}
            />
            <div className={styles.profile}>
              <ButtonDropdown
                items={[
                  { id: ProfileMenuId.Feedback, text: 'Send feedback', iconName: 'contact' },
                  { id: ProfileMenuId.Settings, text: 'Settings', iconName: 'settings' },
                ]}
                onItemFollow={handleFollow}
                mainAction={{ text: 'Sign in', href: Pathname.Signin, iconName: 'user-profile' }}
                onItemClick={handleProfileItemClick}
              >
                Sign in
              </ButtonDropdown>
            </div>
          </>
        }
      />
      <Settings visible={isSettingsVisible} onDismiss={() => setIsSettingsVisible(false)} />
      <Feedback isVisible={isFeedbackVisible} onDismiss={() => setIsFeedbackVisible(false)} />
    </>
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
