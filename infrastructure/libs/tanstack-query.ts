import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60, gcTime: 1000 * 60 * 60 } },
});

export { QueryClientProvider };
