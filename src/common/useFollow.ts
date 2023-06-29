import { useNavigate } from 'react-router';
import { useCallback } from 'react';

export default function useFollow(): State {
  const navigate = useNavigate();

  return useCallback((options: Options): void => {
    const { isExternal, event, href} = options;
    if (isExternal) {
      return;
    }
    event.preventDefault();
    navigate(href);
  }, [navigate]);
}

interface Options {
  href: string;
  isExternal?: boolean;
  event: CustomEvent;
}

type State = (opts: Options) => void;