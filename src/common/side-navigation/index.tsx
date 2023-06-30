import SideNavigation, { SideNavigationProps } from '@cloudscape-design/components/side-navigation';
import { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router';

import { Pathname } from '../../routes';
import useFollow from '../useFollow';

export default function DhSideNavigation() {
  const follow = useFollow();
  const { pathname } = useLocation();
  const handleFollow = useCallback((event: CustomEvent<SideNavigationProps.FollowDetail>): void => {
    const { href, external: isExternal } = event.detail;
    follow({ event, href, isExternal });
  }, [follow]);

  const items = useMemo((): SideNavigationProps.Item[] => {
    return [
      // {
      //   type: 'link',
      //   text: 'Pomodoro timer',
      //   href: Pathname.Pomodoro,
      // },
      {
        type: 'section',
        text: 'Diablo IV Nightmare Dungeon',
        items: [
          {
            type: 'link',
            text: 'Suggested sigil tier',
            href: Pathname.DiabloSuggestedSigilTier,
          },
          {
            type: 'link',
            text: 'Monster level calculator',
            href: Pathname.DiabloMonsterLevelCalculator,
          },
        ],
      },
      // TODO: Add unified settings
      { type: 'divider' },
      {
        type: 'link',
        text: 'Settings',
        href: Pathname.Settings,
      },
    ];
  }, []);

  return (
    <SideNavigation
      activeHref={pathname}
      header={{ text: 'Drew\'s Widgets', href: Pathname.Home }}
      items={items}
      onFollow={handleFollow}
    />
  );
}