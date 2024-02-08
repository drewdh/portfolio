import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RouterProvider } from 'react-router';

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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
