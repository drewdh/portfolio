import AppLayout, { AppLayoutProps } from '@cloudscape-design/components/app-layout';

import { footerSelector } from '../footer/constants';
import { topNavSelector } from '../top-navigation/constants';
import { forwardRef } from 'react';

function DhAppLayout(props: Props) {
  return <AppLayout {...props} footerSelector={footerSelector} headerSelector={topNavSelector} />;
}

export default forwardRef(DhAppLayout);

type Props = Omit<AppLayoutProps, 'footerSelector' | 'headerSelector'>;
