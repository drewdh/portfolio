import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import AppLayout, { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import { BreadcrumbGroupProps } from '@cloudscape-design/components/breadcrumb-group';
import Header from '@cloudscape-design/components/header';
import Box from '@cloudscape-design/components/box';
import Tabs, { TabsProps } from '@cloudscape-design/components/tabs';
import ContentLayout from '@cloudscape-design/components/content-layout';
import { NonCancelableCustomEvent } from '@cloudscape-design/components';

import SuggestedSigilTier from './SuggestedSigilTier';
import { Pathname } from '../../routes';
import Breadcrumbs from '../../common/Breadcrumbs';
import DhSideNavigation from '../../common/side-navigation';
import { HelpPanelProvider } from '../../help-panel/help-panel';
import widgetDetails from '../../common/widgetDetails';
import { topNavSelector } from '../../top-navigation/constants';
import { useLocation, useNavigate } from 'react-router';
import PlayerStatistics from './PlayerStatistics';
import useTitle from '../../useTitle';

const tabIdQueryParam = 'tabId';

enum TabId {
  NightmareDungeon = 'nightmare-dungeon',
  PlayerStatistics = 'player-statistics',
}

export default function SuggestedSigilTierPage() {
  useTitle(widgetDetails.diablo.title);
  const [content, setContent] = useState<ReactNode>(null);
  const ref = useRef<AppLayoutProps.Ref>(null);
  const breadcrumbs: BreadcrumbGroupProps.Item[] = [
    { text: widgetDetails.diablo.title, href: Pathname.DiabloSuggestedSigilTier },
  ];

  const { search } = useLocation();
  const navigate = useNavigate();
  const activeTabQueryParam = useMemo((): TabId => {
    const queryParams = new URLSearchParams(search);
    return queryParams.get(tabIdQueryParam) as TabId ?? TabId.NightmareDungeon;
  }, [search]);
  const [activeTabId, setActiveTabId] = useState<TabId>(activeTabQueryParam);

  useEffect((): void => {
    if (activeTabQueryParam && activeTabQueryParam !== activeTabId) {
      setActiveTabId(activeTabQueryParam);
    }
  }, [activeTabQueryParam, activeTabId]);

  const handleTabChange = useCallback((event: NonCancelableCustomEvent<TabsProps.ChangeDetail>): void => {
    const { activeTabId, activeTabHref } = event.detail;
    setActiveTabId(activeTabId as TabId);
    if (activeTabHref) {
      navigate(activeTabHref);
    }
  }, [navigate]);

  const openPanel = useCallback((): void => {
    ref.current?.openTools();
  }, [ref]);

  return (
    <HelpPanelProvider config={{ content, setContent, openPanel }}>
      <AppLayout
        breadcrumbs={<Breadcrumbs items={breadcrumbs} />}
        content={
          <ContentLayout
            disableOverlap
            header={
              <Header
                variant="h1"
                description={widgetDetails.diablo.description}
              >{widgetDetails.diablo.title}</Header>
            }
          >
            <Box margin={{ top: 's' }}>
              <Tabs
                activeTabId={activeTabId}
                onChange={handleTabChange}
                tabs={[
                  {
                    id: TabId.NightmareDungeon,
                    label: 'Nightmare dungeon',
                    href: `${Pathname.DiabloSuggestedSigilTier}?${tabIdQueryParam}=${TabId.NightmareDungeon}`,
                    content: <SuggestedSigilTier />,
                  },
                  {
                    id: TabId.PlayerStatistics,
                    label: <span>Player statistics - <i>static preview</i></span>,
                    href: `${Pathname.DiabloSuggestedSigilTier}?${tabIdQueryParam}=${TabId.PlayerStatistics}`,
                    content: <PlayerStatistics />,
                  },
                ]} />
            </Box>
          </ContentLayout>
        }
        navigation={<DhSideNavigation />}
        ref={ref}
        tools={content}
        headerSelector={topNavSelector}
        toolsHide
      />
    </HelpPanelProvider>
  )
}