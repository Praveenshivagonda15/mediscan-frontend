import { api } from '@/lib/axios';
import type { BrandWithAlternatives, DrugSearchResults } from '@/types/drug';
import type { ScanResult } from '@/types/scan';

export async function searchDrugs(query: string, limit = 10): Promise<DrugSearchResults> {
  const { data } = await api.get<{ success: true; data: DrugSearchResults }>('/api/drugs/search', {
    params: { q: query, limit },
  });
  return data.data;
}

export async function getBrandDetails(brandId: string, limit = 10): Promise<BrandWithAlternatives> {
  const { data } = await api.get<{ success: true; data: BrandWithAlternatives }>(`/api/drugs/brands/${brandId}`, {
    params: { limit },
  });
  return data.data;
}

export type { ScanResult };