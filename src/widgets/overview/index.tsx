import { useCallback, useEffect, useState } from 'react';
import AppLayout, { AppLayoutProps } from '@cloudscape-design/components/app-layout';

import Breadcrumbs from '../../common/Breadcrumbs';
import DhSideNavigation from '../../common/side-navigation';
import Overview from './Overview';
import useLocalStorage, { LocalStorageKey } from '../../useLocalStorage';
import { NonCancelableCustomEvent } from '@cloudscape-design/components';

export default function OverviewPage() {
  const [isNewVisitor, setIsNewVisitor] = useLocalStorage<boolean>(LocalStorageKey.IsNewVisitor, true);
  const [navigationOpen, setNavigationOpen] = useState<boolean>(!isNewVisitor);

  const handleNavigationChange = useCallback((event: NonCancelableCustomEvent<AppLayoutProps.ChangeDetail>): void => {
    setNavigationOpen(event.detail.open);
  }, []);

  useEffect(() => {
    return function() {
      setIsNewVisitor(false);
    }
  }, [setIsNewVisitor]);

  return (
    <AppLayout
      breadcrumbs={<Breadcrumbs items={[]} />}
      content={<Overview />}
      onNavigationChange={handleNavigationChange}
      navigationOpen={navigationOpen}
      navigation={<DhSideNavigation />}
      toolsHide
    />
  );
}
