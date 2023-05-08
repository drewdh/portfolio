import { useNavigate } from 'react-router';
import { useCallback } from 'react';

export default function useFollow(): State {
  const navigate = useNavigate();

  return useCallback((href: string, isExternal: boolean, event: CustomEvent): void => {
    if (isExternal) {
      return;
    }
    event.preventDefault();
    navigate(href);
  }, [navigate]);
}

type State = (href: string, isExternal: boolean, event: CustomEvent) => void;