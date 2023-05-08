import { ReactNode, useCallback, useRef, useState } from 'react';
import AppLayout, { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import Flashbar from '@cloudscape-design/components/flashbar';
import BreadcrumbGroup, { BreadcrumbGroupProps } from '@cloudscape-design/components/breadcrumb-group';

import Board from './Board';
import useNotifications from '../notifications';
import { HelpPanelProvider } from '../help-panel/help-panel';
import { topNavSelector } from '../top-navigation/constants';
import useFollow from '../common/useFollow';

export default function Dashboard() {
  const follow = useFollow();
  const { items } = useNotifications();
  const [content, setContent] = useState<ReactNode>();
  const ref = useRef<AppLayoutProps.Ref>(null);

  const openPanel = useCallback(() => {
    ref.current?.openTools();
  }, [ref]);

  const handleFollow = useCallback((event: CustomEvent<BreadcrumbGroupProps.ClickDetail>): void => {
    const { href, external = false } = event.detail;
    follow(href, external, event);
  }, [follow]);

  const breadcrumbItems = [
    { text: 'Drew Hanberry', href: '/' },
    { text: 'Widgets', href: '/' },
  ];

  return (
    <HelpPanelProvider config={{ content, setContent, openPanel }}>
      <AppLayout
        breadcrumbs={<BreadcrumbGroup onFollow={handleFollow} items={breadcrumbItems} />}
        ref={ref}
        content={<Board />}
        contentType="dashboard"
        navigationHide
        notifications={<Flashbar items={items} stackItems />}
        tools={content}
        headerSelector={topNavSelector}
      />
    </HelpPanelProvider>
  );
}
