import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import DhBreadcrumbs from 'common/dh-breadcrumbs';
import Overview from './overview';
import { LocalStorageKey } from 'utilities/local-storage-keys';
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
    <DhAppLayout breadcrumbs={<DhBreadcrumbs items={[]} />} content={<Overview />} toolsHide />
  );
}
