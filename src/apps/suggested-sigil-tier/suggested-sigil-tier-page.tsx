import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import { BreadcrumbGroupProps } from '@cloudscape-design/components/breadcrumb-group';
import Header from '@cloudscape-design/components/header';
import Tabs, { TabsProps } from '@cloudscape-design/components/tabs';
import ContentLayout from '@cloudscape-design/components/content-layout';
import { NonCancelableCustomEvent } from '@cloudscape-design/components';
import { useLocation, useNavigate } from 'react-router';

import DhBreadcrumbs from 'common/dh-breadcrumbs';
import widgetDetails from 'common/widget-details';
import DhAppLayout from 'common/dh-app-layout';
import SuggestedSigilTier from './suggested-sigil-tier';
import { Pathname } from 'utilities/routes';
import { HelpPanelProvider } from '../../help-panel/help-panel';
import PlayerStatistics from './player-statistics';
import useTitle from 'utilities/use-title';

const tabIdQueryParam = 't';

enum TabId {
  NightmareDungeon = 'nd',
  PlayerStatistics = 'ps',
}

const defaultTab = TabId.NightmareDungeon;

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
  const queryParams = useMemo(() => new URLSearchParams(search), [search]);
  const navigate = useNavigate();

  // Set default query param if not already set
  useEffect(() => {
    const qpValue = queryParams.get(tabIdQueryParam) as TabId;
    if (!qpValue) {
      navigate(
        { pathname: Pathname.Diablo, search: `?${tabIdQueryParam}=${defaultTab}` },
        { replace: true }
      );
    }
  }, [navigate, queryParams]);

  // Set active tab ID from query param
  useEffect(() => {
    setActiveTabId(queryParams.get(tabIdQueryParam) as TabId);
  }, [queryParams]);

  const [activeTabId, setActiveTabId] = useState<TabId>(
    (queryParams.get(tabIdQueryParam) as TabId) ?? defaultTab
  );

  function handleTabChange(event: NonCancelableCustomEvent<TabsProps.ChangeDetail>): void {
    const { activeTabHref } = event.detail;
    if (activeTabHref) {
      navigate(activeTabHref);
    }
  }

  function openPanel() {
    ref.current?.openTools();
  }

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
