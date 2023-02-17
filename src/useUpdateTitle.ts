import { useCallback, useMemo } from 'react';
import { useLocation, useMatches } from 'react-router';
import { Handle } from './index';

const defaultTitle = 'Drew Hanberry';

/** Updates document title detail while retaining original title */
export default function useUpdateTitle() {
  const matches = useMatches();
  const { pathname } = useLocation();

  const routeTitle = useMemo((): string | undefined => {
    return (matches.find((match) => {
      return match.handle && match.pathname === pathname;
    })?.handle as Handle)?.title;
  }, [matches, pathname]);

  return useCallback((detail: string = ''): void => {
    const titleParts = [];
    if (detail) {
      titleParts.push(detail);
    }
    if (routeTitle) {
      titleParts.push(routeTitle);
    }
    titleParts.push(defaultTitle);
    document.title = titleParts.join(' - ');
  }, [routeTitle]);
}
