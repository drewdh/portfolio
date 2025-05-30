import { useEffect } from 'react';

const defaultRoute = '/';
const routes = [defaultRoute];

export default function useRouter() {
  useEffect(() => {
    if (!routes.includes(window.location.pathname)) {
      window.history.replaceState({}, '', defaultRoute);
    }
  }, []);
}
