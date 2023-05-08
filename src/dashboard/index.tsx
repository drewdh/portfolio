import { ReactNode, useCallback, useRef, useState } from 'react';
import AppLayout, { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import Flashbar from '@cloudscape-design/components/flashbar';

import Board from './Board';
import useNotifications from '../notifications';
import { HelpPanelProvider } from '../help-panel/help-panel';
import { topNavSelector } from '../top-navigation/constants';

export default function Dashboard() {
  const { items } = useNotifications();
  const [content, setContent] = useState<ReactNode>();
  const ref = useRef<AppLayoutProps.Ref>(null);

  const openPanel = useCallback(() => {
    ref.current?.openTools();
  }, [ref]);

  return (
    <HelpPanelProvider config={{ content, setContent, openPanel }}>
      <AppLayout
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
