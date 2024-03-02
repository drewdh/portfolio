import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import { BreadcrumbGroupProps } from '@cloudscape-design/components/breadcrumb-group';
import Header from '@cloudscape-design/components/header';
import Tabs, { TabsProps } from '@cloudscape-design/components/tabs';
import ContentLayout from '@cloudscape-design/components/content-layout';
import { NonCancelableCustomEvent } from '@cloudscape-design/components';

import DhBreadcrumbs from 'common/dh-breadcrumbs';
import widgetDetails from 'common/widget-details';
import DhAppLayout from 'common/dh-app-layout';
import SuggestedSigilTier from './suggested-sigil-tier';
import { Pathname } from 'utilities/routes';
import { HelpPanelProvider } from '../../help-panel/help-panel';
import { useLocation, useNavigate } from 'react-router';
import PlayerStatistics from './player-statistics';
import useTitle from 'utilities/use-title';

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
    {
      text: widgetDetails.diablo.title,
      href: Pathname.Diablo,
    },
  ];

  const { search } = useLocation();
  const navigate = useNavigate();
  const activeTabQueryParam = useMemo((): TabId => {
    const queryParams = new URLSearchParams(search);
    return (queryParams.get(tabIdQueryParam) as TabId) ?? TabId.NightmareDungeon;
  }, [search]);
  const [activeTabId, setActiveTabId] = useState<TabId>(activeTabQueryParam);

  useEffect((): void => {
    if (activeTabQueryParam && activeTabQueryParam !== activeTabId) {
      setActiveTabId(activeTabQueryParam);
    }
  }, [activeTabQueryParam, activeTabId]);

  const handleTabChange = useCallback(
    (event: NonCancelableCustomEvent<TabsProps.ChangeDetail>): void => {
      const { activeTabId, activeTabHref } = event.detail;
      setActiveTabId(activeTabId as TabId);
      if (activeTabHref) {
        navigate(activeTabHref);
      }
    },
    [navigate]
  );

  const openPanel = useCallback((): void => {
    ref.current?.openTools();
  }, [ref]);

  return (
    <HelpPanelProvider config={{ content, setContent, openPanel }}>
      <DhAppLayout
        breadcrumbs={<DhBreadcrumbs items={breadcrumbs} />}
        content={
          <ContentLayout
            header={
              <Header variant="h1" description={widgetDetails.diablo.description}>
                {widgetDetails.diablo.title}
              </Header>
            }
          >
            <Tabs
              activeTabId={activeTabId}
              onChange={handleTabChange}
              tabs={[
                {
                  id: TabId.NightmareDungeon,
                  label: 'Nightmare dungeon',
                  href: `${Pathname.Diablo}?${tabIdQueryParam}=${TabId.NightmareDungeon}`,
                  content: <SuggestedSigilTier />,
                },
                {
                  id: TabId.PlayerStatistics,
                  label: (
                    <span>
                      Player statistics - <i>static preview</i>
                    </span>
                  ),
                  href: `${Pathname.Diablo}?${tabIdQueryParam}=${TabId.PlayerStatistics}`,
                  content: <PlayerStatistics />,
                },
              ]}
            />
          </ContentLayout>
        }
        ref={ref}
        tools={content}
        navigationHide
        toolsHide
      />
    </HelpPanelProvider>
  );
}
