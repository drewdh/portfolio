import SideNavigation, {
  SideNavigationProps,
} from '@cloudscape-design/components/side-navigation';
import { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router';
import Badge from '@cloudscape-design/components/badge';

import { Pathname } from '../../routes';
import useFollow from '../useFollow';
import widgetDetails from '../widgetDetails';

export default function DhSideNavigation() {
  const follow = useFollow();
  const { pathname } = useLocation();
  const handleFollow = useCallback(
    (event: CustomEvent<SideNavigationProps.FollowDetail>): void => {
      const { href, external: isExternal } = event.detail;
      follow({ event, href, isExternal });
    },
    [follow]
  );

  const items = useMemo((): SideNavigationProps.Item[] => {
    return [
      // {
      //   type: 'link',
      //   text: 'Coffee Calculator',
      //   href: Pathname.CoffeeCalculator,
      // },
      {
        type: 'link',
        text: widgetDetails.ecobee.title,
        href: Pathname.Ecobee,
      },
      {
        type: 'link',
        text: widgetDetails.diablo.title,
        href: Pathname.DiabloSuggestedSigilTier,
        info: <Badge>Out of date</Badge>,
      },
      // { type: 'divider' },
      // {
      //   type: 'link',
      //   text: 'Feedback',
      //   href: Pathname.Settings,
      // },
    ];
  }, []);

  return (
    <>
      <SideNavigation
        activeHref={pathname}
        header={{ text: "Drew's Widgets", href: Pathname.Home }}
        items={items}
        onFollow={handleFollow}
      />
    </>
  );
}
