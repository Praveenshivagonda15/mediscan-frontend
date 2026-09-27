import { QueryClient } from '@tanstack/react-query';
import { ApiClientError } from '@/types/api';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (count, error) => {
        if (error instanceof ApiClientError && error.status >= 400 && error.status < 500) return false;
        return count < 1;
      },
      staleTime: 30_000,
      refetchOnWindowFocus: false,
    },
    mutations: { retry: false },
  },
});