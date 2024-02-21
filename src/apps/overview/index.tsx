import { useEffect } from 'react';

import DhBreadcrumbs from '../../common/DhBreadcrumbs';
import Overview from './Overview';
import useLocalStorage, { LocalStorageKey } from '../../utilities/useLocalStorage';
import DhAppLayout from '../../common/app-layout/dh-app-layout';

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
    <DhAppLayout
      breadcrumbs={<DhBreadcrumbs items={[]} />}
      content={<Overview />}
      navigationHide
      toolsHide
    />
  );
}