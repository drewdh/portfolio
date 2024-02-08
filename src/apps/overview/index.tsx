import { useEffect } from 'react';

import Breadcrumbs from '../../common/Breadcrumbs';
import Overview from './Overview';
import useLocalStorage, { LocalStorageKey } from '../../utilities/useLocalStorage';
import DhAppLayout from '../../common/dh-app-layout';

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
      breadcrumbs={<Breadcrumbs items={[]} />}
      content={<Overview />}
      navigationHide
      toolsHide
    />
  );
}
