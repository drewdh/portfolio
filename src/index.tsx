import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { RouterProvider } from 'react-router';
import { BreadcrumbGroupProps } from '@cloudscape-design/components/breadcrumb-group';

import { RouteConfig, routeConfigs } from './routes';
import './index.scss';
import App from './app';
import reportWebVitals from './reportWebVitals';
import { AppLayoutProps } from '@cloudscape-design/components/app-layout';

export interface Handle {
  breadcrumbs?: BreadcrumbGroupProps.Item[];
  contentType?: AppLayoutProps.ContentType;
  disableContentPaddings?: boolean;
  navigationHide?: boolean;
  title?: string;
}

type Route = RouteObject & { handle: Handle };

function routeMapper(routeObject: Record<string, RouteConfig>) {
  return Object.keys(routeObject).map((routeKey): Route => {
    const route = routeObject[routeKey];
    return {
      path: route.href,
      element: route.element,
      children: route.children ? routeMapper(route.children) : undefined,
      handle: {
        contentType: route.contentType,
        disableContentPaddings: route.disableContentPaddings,
        breadcrumbs: route.breadcrumbs,
        navigationHide: route.navigationHide,
        title: route.title,
      },
    };
  });
}

const router = createBrowserRouter([
  {
    element: <App />,
    children: routeMapper(routeConfigs),
  },
]);

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
