import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RouterProvider } from 'react-router';
import { I18nProvider, importMessages } from '@cloudscape-design/components/i18n';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Theme, applyTheme } from '@cloudscape-design/components/theming';

import { Pathname } from './routes';
import './index.scss';
import App from './app';
import reportWebVitals from './reportWebVitals';
import SuggestedSigilTierPage from './apps/suggested-sigil-tier';
import OverviewPage from './apps/overview';
import EcobeePage from './apps/ecobee';
import Login from './auth/login';
import AuthPage from './auth/auth-page';
import PasswordReset from './auth/password-reset';

const theme: Theme = {
  tokens: {},
  contexts: {
    header: {
      tokens: {
        colorBackgroundLayoutMain: {
          light: '#ffffff',
          dark: '#0f1b2a',
        },
        colorTextLinkDefault: {
          light: '#0972d3',
          dark: '#539fe5',
        },
        colorTextLinkHover: {
          light: '#033160',
          dark: '#89bdee',
        },
        colorTextHeadingDefault: {
          light: '#000716',
          dark: '#d1d5db',
        },
        colorTextHeadingSecondary: {
          light: '#414d5c',
          dark: '#8d99a8',
        },
        colorTextStatusInactive: {
          light: '#5f6b7a',
          dark: '#8d99a8',
        },
        colorTextBreadcrumbCurrent: {
          light: '#5f6b7a',
          dark: '#7d8998',
        },
        colorTextBreadcrumbIcon: {
          light: '#7d8998',
          dark: '#5f6b7a',
        },
        colorBackgroundButtonNormalDefault: {
          light: '#ffffff',
          dark: '#0f1b2a',
        },
        colorBackgroundButtonNormalActive: {
          light: '#d3e7f9',
          dark: '#354150',
        },
        colorBackgroundButtonNormalDisabled: {
          light: '#ffffff',
          dark: '#0f1b2a',
        },
        colorBackgroundButtonNormalHover: {
          light: '#f2f8fd',
          dark: '#192534',
        },
        colorBorderButtonNormalActive: {
          light: '#033160',
          dark: '#89bdee',
        },
        colorBorderButtonNormalDefault: {
          light: '#0972d3',
          dark: '#539fe5',
        },
        colorBorderButtonNormalDisabled: {
          light: '#9ba7b6',
          dark: '#5f6b7a',
        },
        colorBorderButtonNormalHover: {
          light: '#033160',
          dark: '#89bdee',
        },
        colorTextButtonNormalDefault: {
          light: '#0972d3',
          dark: '#539fe5',
        },
        colorTextButtonNormalActive: {
          light: '#033160',
          dark: '#89bdee',
        },
        colorTextButtonNormalHover: {
          light: '#033160',
          dark: '#89bdee',
        },
        colorTextInteractiveDisabled: {
          light: '#9ba7b6',
          dark: '#5f6b7a',
        },
      },
    },
  },
};
applyTheme({ theme });

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
