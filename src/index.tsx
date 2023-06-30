import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RouterProvider } from 'react-router';

import { Pathname } from './routes';
import './index.scss';
import App from './app';
import reportWebVitals from './reportWebVitals';
import SuggestedSigilTierPage from './widgets/suggested-sigil-tier';
import MonsterLevelCalculatorPage from './widgets/monster-level-calculator';
import SuggestedSigilTierSettings from './widgets/settings/SuggestedSigilTier';
import OverviewPage from './widgets/overview';
import SettingsPage from './widgets/settings';
import Display from './widgets/settings/Display';

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
          element: <MonsterLevelCalculatorPage />,
        },
        {
          path: Pathname.DiabloSuggestedSigilTier,
          element: <SuggestedSigilTierPage />,
        },
        {
          path: Pathname.DiabloSuggestedSigilTierSettings,
          element: <SuggestedSigilTierSettings />,
        },
        {
          path: Pathname.Settings,
          element: <SettingsPage />,
        },
        {
          path: Pathname.SettingsDisplay,
          element: <Display />,
        },
      ],
    },
  ],
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
