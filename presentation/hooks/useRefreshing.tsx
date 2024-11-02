// created a hook to self managed state for refetching
// this is addressing a Tanstack Query bug that causes stutter on iOS pull to refresh functionality
// It is safe to remove after making sure the Tanstack Query "refetch" and "isRefetching" works flawlessly on iOS
import React from "react";

const useRefreshing = (refetch: () => Promise<any>) => {
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const refresh = React.useCallback(() => {
    setIsRefreshing(true);
    refetch().finally(() => setIsRefreshing(false));
  }, [refetch]);

  return { isRefreshing, refresh };
};

export default useRefreshing;
