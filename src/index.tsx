import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RouterProvider } from 'react-router';
import { I18nProvider, importMessages } from '@cloudscape-design/components/i18n';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Pathname } from 'utilities/routes';
import './index.scss';
import App from './app';
import reportWebVitals from './reportWebVitals';
import SuggestedSigilTierPage from './apps/suggested-sigil-tier/suggested-sigil-tier-page';
import OverviewPage from './apps/overview/overview-page';
import EcobeePage from './apps/ecobee/ecobee-page';
import Login from './auth/login';
import AuthPage from './auth/auth-page';
import PasswordReset from './auth/password-reset';
import TwitchPage from './apps/twitch/twitch-page';

interface GlobalFlags {
  removeHighContrastHeader?: boolean;
}
const symbol = Symbol.for('awsui-global-flags');
interface FlagsHolder {
  [symbol]?: GlobalFlags;
}
if (!(window as FlagsHolder)[symbol]) {
  (window as FlagsHolder)[symbol] = {};
}
(window as FlagsHolder)[symbol]!.removeHighContrastHeader = true;

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: Pathname.Fallback,
        // TODO: Log 404s since it could be a broken link
        element: <Navigate to={Pathname.Home} replace />,
      },
      {
        path: Pathname.Home,
        element: <OverviewPage />,
      },
      {
        path: Pathname.DiabloMonsterLevelCalculator,
        element: <Navigate to={Pathname.Diablo} replace />,
      },
      {
        path: Pathname.DiabloSuggestedSigilTierOld,
        element: <Navigate to={Pathname.Diablo} replace />,
      },
      {
        path: Pathname.Diablo,
        element: <SuggestedSigilTierPage />,
      },
      {
        path: Pathname.Ecobee,
        element: <EcobeePage />,
      },
      {
        path: Pathname.Twitch,
        element: <TwitchPage />,
      },
    ],
  },
  {
    element: <AuthPage />,
    path: Pathname.Auth,
    children: [
      {
        path: Pathname.Signin,
        element: <Login />,
      },
      {
        path: Pathname.PasswordReset,
        element: <PasswordReset />,
      },
    ],
  },
]);

const queryClient = new QueryClient();
const locale = document.documentElement.lang;
const messages = await importMessages(locale);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <I18nProvider locale={locale} messages={messages}>
        <RouterProvider router={router} />
      </I18nProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
