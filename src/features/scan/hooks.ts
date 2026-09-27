import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ApiClientError } from '@/types/api';
import { useAuthStore } from '@/stores/authStore';
import * as api from './api';
import type { ScanResult } from '@/types/scan';

export const scanKeys = {
  history: ['scan', 'history'] as const,
  quota: ['scan', 'quota'] as const,
  detail: (id: string) => ['scan', 'detail', id] as const,
};

export function useScanUpload() {
  const qc = useQueryClient();
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation<ScanResult, Error, File>({
    mutationFn: (file) => api.uploadScan(file),
    onSuccess: (result) => {
      qc.setQueryData(scanKeys.quota, result.quota);
      qc.invalidateQueries({ queryKey: scanKeys.history });
      const user = useAuthStore.getState().user;
      if (user) setUser({ ...user, scanCount: user.scanCount + 1 });
    },
    onError: (err) => {
      if (err instanceof ApiClientError) {
        if (err.code === 'SCAN_QUOTA_EXCEEDED') {
          toast.error(err.message);
          qc.invalidateQueries({ queryKey: scanKeys.quota });
        } else {
          toast.error(err.message || 'Scan failed. Please try again.');
        }
      } else {
        toast.error('Scan failed. Check your connection.');
      }
    },
  });
}

export function useScanHistory(limit = 50) {
  return useQuery({
    queryKey: [...scanKeys.history, limit],
    queryFn: () => api.getHistory(limit),
    staleTime: 60_000,
  });
}

export function useScanQuota() {
  return useQuery({
    queryKey: scanKeys.quota,
    queryFn: () => api.getQuota(),
    staleTime: 30_000,
  });
}

export function useScanDetail(scanId: string) {
  return useQuery({
    queryKey: scanKeys.detail(scanId),
    queryFn: () => api.getScanDetail(scanId),
    enabled: Boolean(scanId),
    staleTime: 60_000,
  });
}