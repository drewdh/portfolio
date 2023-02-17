import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

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
  PomodoroTimer = '/pomodoro-timer',
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
    title: 'Home',
    element: <WidgetsOverview />,
    disableContentPaddings: true,
    contentType: 'dashboard',
  },
  pomodoroTimer: {
    href: Pathname.PomodoroTimer,
    title: 'Pomodoro timer',
    element: <Timer/>,
    breadcrumbs: [
      { text: 'Drew Hanberry', href: Pathname.Home },
      { text: 'Pomodoro timer', href: Pathname.PomodoroTimer },
    ],
  },
};
