import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1, // Retry failed queries once
    },
    mutations: {
      retry: 1, // Retry failed mutations once
    },
  },
});

export default queryClient;
