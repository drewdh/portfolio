import { useEffect } from 'react';

import DhBreadcrumbs from 'common/dh-breadcrumbs';
import Overview from './overview';
import useLocalStorage, { LocalStorageKey } from 'utilities/use-local-storage';
import DhAppLayout from 'common/dh-app-layout';

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
