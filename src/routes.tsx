import { ReactNode } from 'react';
import { Home } from './home/Home';
import { Timer } from './widgets/timer/Timer';
import { Handle } from './index';
import { Navigate } from 'react-router-dom';
import { Overview as WidgetsOverview } from './widgets/overview/Overview';

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
}

export const routeConfigs: { [routeKey: string]: RouteConfig } = {
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
