import { useQuery } from '@tanstack/react-query';
import * as api from './api';

export const drugKeys = {
  search: (q: string) => ['drugs', 'search', q] as const,
  brand: (id: string) => ['drugs', 'brand', id] as const,
};

export function useDrugSearch(query: string, enabled = true) {
  const trimmed = query.trim();
  return useQuery({
    queryKey: drugKeys.search(trimmed),
    queryFn: () => api.searchDrugs(trimmed, 10),
    enabled: enabled && trimmed.length >= 2,
    staleTime: 60_000,
    placeholderData: (prev) => prev,
  });
}

export function useBrandDetails(brandId: string | null) {
  return useQuery({
    queryKey: brandId ? drugKeys.brand(brandId) : ['drugs', 'brand', 'none'],
    queryFn: () => api.getBrandDetails(brandId!, 10),
    enabled: Boolean(brandId),
    staleTime: 5 * 60_000,
  });
}