import { ReactNode, useCallback, useRef, useState } from 'react';
import AppLayout, { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import Flashbar from '@cloudscape-design/components/flashbar';
import SplitPanel from '@cloudscape-design/components/split-panel';
import { NonCancelableCustomEvent } from '@cloudscape-design/components';

import Board from './Board';
import useNotifications from '../notifications';
import { HelpPanelProvider } from '../help-panel/help-panel';
import { topNavSelector } from '../top-navigation/constants';
import useLocalStorage, { LocalStorageKey } from '../useLocalStorage';
import { splitPanelI18nStrings } from '../i18n-strings/split-panel';
import Palette from './Palette';
import { BoardProps } from '@cloudscape-design/board-components/board';
import { WidgetConfig } from '../widgets/interfaces';
import DhSideNavigation from '../common/side-navigation';
import Breadcrumbs from '../common/Breadcrumbs';
import { Pathname } from '../routes';

const maxPanelSize = 360;

export default function Dashboard() {
  const { items } = useNotifications();
  const [content, setContent] = useState<ReactNode>();
  const [isSplitPanelOpen, setIsSplitPanelOpen] = useState<boolean>(false);
  const [splitPanelSize, setSplitPanelSize] = useLocalStorage<number>(LocalStorageKey.WidgetPanelSize, 360);
  const [paletteItems, setPaletteItems] = useState<ReadonlyArray<BoardProps.Item<WidgetConfig>>>([]);
  const ref = useRef<AppLayoutProps.Ref>(null);

  const openPanel = useCallback(() => {
    ref.current?.openTools();
  }, [ref]);

  const handleSplitPanelResize = useCallback((event: NonCancelableCustomEvent<AppLayoutProps.SplitPanelResizeDetail>): void => {
    const newSize = Math.min(event.detail.size, maxPanelSize);
    setSplitPanelSize(newSize);
  }, [setSplitPanelSize]);

  const handleSplitPanelToggle = useCallback((event: NonCancelableCustomEvent<AppLayoutProps.ChangeDetail>): void => {
    setIsSplitPanelOpen(event.detail.open);
  }, []);

  const handleAdd = useCallback((): void => {
    setIsSplitPanelOpen(true);
  }, []);

  const handlePaletteItemsChange = useCallback((items: ReadonlyArray<BoardProps.Item<WidgetConfig>>): void => {
    setPaletteItems(items);
  }, []);

  return (
    <HelpPanelProvider config={{ content, setContent, openPanel }}>
      <AppLayout
        breadcrumbs={<Breadcrumbs items={[]} />}
        ref={ref}
        content={
          <Board
            onAdd={handleAdd}
            onPaletteItemsChange={handlePaletteItemsChange}
          />}
        contentType="dashboard"
        navigation={<DhSideNavigation />}
        notifications={<Flashbar items={items} stackItems />}
        onSplitPanelResize={handleSplitPanelResize}
        onSplitPanelToggle={handleSplitPanelToggle}
        splitPanel={
          <SplitPanel
            closeBehavior="hide"
            header="Add widgets"
            hidePreferencesButton
            i18nStrings={splitPanelI18nStrings}
          >
            <Palette items={paletteItems} />
          </SplitPanel>
        }
        splitPanelOpen={isSplitPanelOpen}
        splitPanelPreferences={{ position: 'side' }}
        splitPanelSize={splitPanelSize}
        tools={content}
        headerSelector={topNavSelector}
      />
    </HelpPanelProvider>
  );
}
