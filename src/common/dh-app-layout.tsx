import AppLayout, { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import { forwardRef, Ref } from 'react';

import { footerSelector } from '../footer/constants';
import { topNavSelector } from '../top-navigation/constants';

export default forwardRef(function DhAppLayout(props: Props, ref: Ref<AppLayoutProps.Ref>) {
  return (
    <AppLayout
      {...props}
      ref={ref}
      footerSelector={footerSelector}
      headerSelector={topNavSelector}
    />
  );
});

type Props = Omit<AppLayoutProps, 'footerSelector' | 'headerSelector'>;
