import { useEffect } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';

import Breadcrumbs from '../../common/Breadcrumbs';
import DhSideNavigation from '../../common/side-navigation';
import Overview from './Overview';
import useLocalStorage, { LocalStorageKey } from '../../useLocalStorage';
import { topNavSelector } from '../../top-navigation/constants';

let initialIsNewVisitor: boolean | undefined;

export default function OverviewPage() {
  const [isNewVisitor, setIsNewVisitor] = useLocalStorage<boolean>(
    LocalStorageKey.IsNewVisitor,
    true
  );

  useEffect(() => {
    if (initialIsNewVisitor === undefined) {
      initialIsNewVisitor = isNewVisitor;
    }
    return function () {
      setIsNewVisitor(false);
    };
  }, [isNewVisitor, setIsNewVisitor]);

  return (
    <AppLayout
      breadcrumbs={<Breadcrumbs items={[]} />}
      content={<Overview />}
      navigationHide
      toolsHide
      headerSelector={topNavSelector}
    />
  );
}
