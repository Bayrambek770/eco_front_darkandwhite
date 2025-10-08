import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { tokenStore } from './tokenStore';
import { getApiLanguage } from '@/api/lang';

const rawBase = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');
// If the provided base already ends with /api or /api/v*, don't append another /api
const apiBase = /\/api(?:\/v\d+)?$/i.test(rawBase) ? rawBase : `${rawBase}/api`;

export const http = axios.create({
  baseURL: apiBase,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

http.interceptors.request.use((config) => {
  config.headers = config.headers ?? {} as any;
  const lang = getApiLanguage();
  if (lang) config.headers['Accept-Language'] = lang;
  const access = tokenStore.getAccessToken();
  if (access) config.headers.Authorization = `Bearer ${access}`;
  return config;
});

type RetriableConfig = AxiosRequestConfig & { _retry?: boolean };
let isRefreshing = false;
let queue: Array<() => void> = [];

async function refreshAccess() {
  if (isRefreshing) {
    await new Promise<void>((r) => queue.push(r));
    return;
  }
  isRefreshing = true;
  try {
    const refresh = tokenStore.getRefreshToken();
    if (!refresh) throw new Error('No refresh token');
    const { data } = await http.post<{ access: string }>('/token/refresh/', { refresh });
    // Update only access token, keep refresh as-is
    localStorage.setItem('access_token', data.access);
  } finally {
    isRefreshing = false;
    queue.splice(0).forEach((fn) => fn());
  }
}

http.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const status = error.response?.status;
    const original = error.config as RetriableConfig;
    const isRefresh = (original?.url || '').includes('/token/refresh/');
    if (status === 401 && !original?._retry && !isRefresh) {
      try {
        original._retry = true;
        await refreshAccess();
        return http(original);
      } catch {
        tokenStore.clear();
      }
    }
    return Promise.reject(error);
  }
);
