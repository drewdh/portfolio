import CloudscapeAppLayout from '@cloudscape-design/components/app-layout';
import Flashbar from '@cloudscape-design/components/flashbar';
import SideNavigation from '@cloudscape-design/components/side-navigation';
import { Outlet } from 'react-router';
import React from 'react';

import useAppLayout from './useAppLayout';
import { topNavSelector } from '../top-navigation/constants';

export default function AppLayout() {
  const {
    activeHref,
    appLayoutRef,
    contentType,
    disableContentPaddings,
    handleFollow,
    navigationHide,
    navigationItems,
    notifications,
    renderBreadcrumbs,
  } = useAppLayout();

  // TODO: Un-collapse side nav when using top navigation
  return (
    <CloudscapeAppLayout
      ref={appLayoutRef}
      breadcrumbs={renderBreadcrumbs()}
      content={<Outlet />}
      contentType={contentType}
      disableContentPaddings={disableContentPaddings}
      headerSelector={topNavSelector}
      navigation={
        <SideNavigation
          activeHref={activeHref}
          items={navigationItems}
          onFollow={handleFollow}
        />
      }
      navigationHide={navigationHide}
      notifications={<Flashbar stackItems items={notifications} />}
      toolsHide
    />
  );
}
