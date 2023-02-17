import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import Home from './home';
import Timer from './widgets/timer';
import { Handle } from './index';
import WidgetsOverview from './widgets/overview';

export interface RouteConfig extends Handle {
  href: Pathname;
  element: ReactNode;
  children?: Record<string, RouteConfig>;
  title?: string;
}

export enum Pathname {
  Home = '/',
  Widgets = '/widgets',
  WidgetsOverview = '/widgets/overview',
  PomodoroTimer = '/widgets/pomodoro-timer',
  Fallback = '*',
}

export const routeConfigs: { [routeKey: string]: RouteConfig } = {
  fallback: {
    href: Pathname.Fallback,
    // TODO: Log 404s since it could be a broken link
    element: <Navigate to={Pathname.Home} replace />,
  },
  home: {
    href: Pathname.Home,
    element: <Home />,
    navigationHide: true,
    disableContentPaddings: true,
  },
  widgets: {
    href: Pathname.Widgets,
    element: <Navigate to={Pathname.WidgetsOverview} replace />,
  },
  widgetsOverview: {
    href: Pathname.WidgetsOverview,
    title: 'Widgets portfolio overview',
    element: <WidgetsOverview />,
    breadcrumbs: [
      { text: 'Drew Hanberry', href: Pathname.Home },
      { text: 'Widgets portfolio', href: Pathname.Widgets },
      { text: 'Overview', href: Pathname.WidgetsOverview },
    ],
  },
  pomodoroTimer: {
    href: Pathname.PomodoroTimer,
    title: 'Pomodoro timer',
    element: <Timer/>,
    breadcrumbs: [
      { text: 'Drew Hanberry', href: Pathname.Home },
      { text: 'Widgets portfolio', href: Pathname.Widgets },
      { text: 'Pomodoro timer', href: Pathname.PomodoroTimer },
    ],
  },
};
