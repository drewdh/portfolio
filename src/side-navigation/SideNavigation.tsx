import CloudscapeSideNavigation from '@cloudscape-design/components/side-navigation';

import useSideNavigation from './useSideNavigation';

export default function SideNavigation() {
  const {
    activeHref,
    handleFollow,
    items,
  } = useSideNavigation();

  return (
    <CloudscapeSideNavigation
      activeHref={activeHref}
      onFollow={handleFollow}
      items={items}
    />
  );
}
