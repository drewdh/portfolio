import SideNavigation, {
  SideNavigationProps,
} from '@cloudscape-design/components/side-navigation';
import { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router';
import Popover from '@cloudscape-design/components/popover';
import Box from '@cloudscape-design/components/box';

import { Pathname } from '../../routes';
import useFollow from '../useFollow';
import widgetDetails from '../widgetDetails';

/** @deprecated Prefer per-app side navigation */
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
        info: (
          <Box color="text-status-info" display="inline">
            <Popover
              header="Static preview feature"
              content="This tool is in static preview for demo purposes and does not use live data."
              triggerType="text"
              renderWithPortal
            >
              <Box color="text-status-info" fontSize="body-s" fontWeight="bold">
                Preview
              </Box>
            </Popover>
          </Box>
        ),
      },
      {
        type: 'link',
        text: widgetDetails.diablo.title,
        href: Pathname.DiabloSuggestedSigilTier,
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
        header={{ text: 'Apps', href: Pathname.Home }}
        items={items}
        onFollow={handleFollow}
      />
    </>
  );
}
