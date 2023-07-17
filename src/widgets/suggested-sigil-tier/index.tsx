import { ReactNode, useCallback, useRef, useState } from 'react';
import AppLayout, { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import { BreadcrumbGroupProps } from '@cloudscape-design/components/breadcrumb-group';

import SuggestedSigilTier from './SuggestedSigilTier';
import { Pathname } from '../../routes';
import Breadcrumbs from '../../common/Breadcrumbs';
import DhSideNavigation from '../../common/side-navigation';
import { HelpPanelProvider } from '../../help-panel/help-panel';
import widgetDetails from '../../common/widgetDetails';

export default function SuggestedSigilTierPage() {
  const [content, setContent] = useState<ReactNode>(null);
  const ref = useRef<AppLayoutProps.Ref>(null);
  const breadcrumbs: BreadcrumbGroupProps.Item[] = [
    { text: widgetDetails.diablo.title, href: Pathname.DiabloSuggestedSigilTier },
  ];

  const openPanel = useCallback((): void => {
    ref.current?.openTools();
  }, [ref]);

  return (
    <HelpPanelProvider config={{ content, setContent, openPanel }}>
      <AppLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        content={<SuggestedSigilTier />}
        navigation={<DhSideNavigation />}
        ref={ref}
        tools={content}
        toolsHide
      />
    </HelpPanelProvider>
  )
}