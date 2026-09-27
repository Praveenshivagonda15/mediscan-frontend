import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/stores/authStore';
import { ApiClientError, type ApiFailure } from '@/types/api';
import { queryClient } from '@/lib/queryClient';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';

export const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 20_000,
  headers: { 'Content-Type': 'application/json' },
});

const refreshApi: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 10_000,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.set('Authorization', `Bearer ${token}`);
  return config;
});

let isRefreshing = false;
let queue: Array<{ resolve: (t: string) => void; reject: (e: unknown) => void }> = [];

function flushQueue(error: unknown, token: string | null) {
  queue.forEach(({ resolve, reject }) => (error || !token ? reject(error) : resolve(token)));
  queue = [];
}

api.interceptors.response.use(
  (r) => r,
  async (error: AxiosError<ApiFailure>) => {
    const orig = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    const status = error.response?.status;

    if (status !== 401 || orig._retry) return Promise.reject(normalizeError(error));
    if (orig.url?.includes('/api/auth/refresh')) {
      handleLogout();
      return Promise.reject(normalizeError(error));
    }

    orig._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queue.push({
          resolve: (token: string) => {
            orig.headers.set('Authorization', `Bearer ${token}`);
            resolve(api(orig));
          },
          reject,
        });
      });
    }

    isRefreshing = true;
    try {
      const { data } = await refreshApi.post<{ success: true; data: { accessToken: string } }>(
        '/api/auth/refresh',
      );
      const newToken = data.data.accessToken;
      useAuthStore.getState().setAccessToken(newToken);
      flushQueue(null, newToken);
      orig.headers.set('Authorization', `Bearer ${newToken}`);
      return api(orig);
    } catch (e) {
      flushQueue(e, null);
      handleLogout();
      return Promise.reject(normalizeError(error));
    } finally {
      isRefreshing = false;
    }
  },
);

function handleLogout() {
  queryClient.clear();
  useAuthStore.getState().clear();
  const { pathname } = window.location;
  if (!pathname.startsWith('/login') && !pathname.startsWith('/signup')) {
    window.location.href = '/login';
  }
}

function normalizeError(error: AxiosError<ApiFailure>): ApiClientError {
  if (error.response?.data && typeof error.response.data === 'object' && 'error' in error.response.data) {
    const { code, message, details } = error.response.data.error;
    return new ApiClientError(message, code, error.response.status, details);
  }
  if (error.code === 'ECONNABORTED') return new ApiClientError('Request timed out.', 'TIMEOUT', 0);
  if (!error.response) return new ApiClientError('Network error.', 'NETWORK_ERROR', 0);
  return new ApiClientError(error.message, 'UNKNOWN_ERROR', error.response.status);
}

export { API_URL };