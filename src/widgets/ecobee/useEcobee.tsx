import { useState } from 'react';

export default function useEcobee(): State {
  const [isFetching, setIsFetching] = useState<boolean>(false);

  function handleRefresh() {
    setIsFetching(true);
  }

  return {
    handleRefresh,
    isFetching,
  };
}

interface State {
  handleRefresh: () => void;
  isFetching: boolean;
}
