import CloudscapeAppLayout from '@cloudscape-design/components/app-layout';
import SideNavigation from '@cloudscape-design/components/side-navigation';
import { Outlet } from 'react-router';
import React from 'react';
import { useAppLayout } from './useAppLayout';
import { topNavSelector } from '../top-navigation/constants';
import { Flashbar } from '@cloudscape-design/components';

export function AppLayout() {
  const {
    activeHref,
    appLayoutRef,
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