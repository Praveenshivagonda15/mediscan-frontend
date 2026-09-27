export interface ApiFailure {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export class ApiClientError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly status: number,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}
import { api } from '@/lib/axios';
import type { ScanHistoryItem, ScanQuota, ScanResult } from '@/types/scan';

export async function uploadScan(file: File): Promise<ScanResult> {
  const form = new FormData();
  form.append('image', file);
  const { data } = await api.post<{ success: true; data: ScanResult }>('/api/scan', form, {
    headers: { 'Content-Type': undefined },
    timeout: 45_000,
  });
  return data.data;
}

export async function getHistory(limit = 50): Promise<ScanHistoryItem[]> {
  const { data } = await api.get<{ success: true; data: { scans: ScanHistoryItem[] } }>(
    '/api/scan/history',
    { params: { limit } },
  );
  return data.data.scans;
}

export async function getQuota(): Promise<ScanQuota> {
  const { data } = await api.get<{ success: true; data: ScanQuota }>('/api/scan/quota');
  return data.data;
}

export async function getScanDetail(scanId: string) {
  const { data } = await api.get<{ success: true; data: { scan: ScanResult } }>(`/api/scan/${scanId}`);
  return data.data.scan;
}