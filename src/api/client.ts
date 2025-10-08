// Lightweight fetch-based API client with JSON helpers and error handling.
// Reads base URL from Vite env: import.meta.env.VITE_API_BASE_URL

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ApiClientOptions {
  baseUrl?: string;
  headers?: Record<string, string>;
}

export class ApiError extends Error {
  status: number;
  info?: unknown;
  constructor(message: string, status: number, info?: unknown) {
    super(message);
    this.status = status;
    this.info = info;
  }
}

export class ApiClient {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor(options?: ApiClientOptions) {
    this.baseUrl = options?.baseUrl ?? (import.meta.env.VITE_API_BASE_URL as string) ?? '';
    this.headers = options?.headers ?? { 'Content-Type': 'application/json' };
  }

  private buildUrl(path: string) {
    if (path.startsWith('http')) return path;
    const base = this.baseUrl?.replace(/\/$/, '') ?? '';
    const p = path.replace(/^\//, '');
    return `${base}/${p}`;
  }

  async request<T = unknown>(path: string, method: HttpMethod = 'GET', body?: unknown, init?: RequestInit): Promise<T> {
    const url = this.buildUrl(path);
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('access_token') : null;
    const authHeader = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await fetch(url, {
      method,
      headers: { ...this.headers, ...authHeader, ...(init?.headers as Record<string, string> | undefined) },
      body: body ? JSON.stringify(body) : undefined,
      ...init,
    });

    const contentType = res.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');
    const data = isJson ? await res.json().catch(() => undefined) : await res.text().catch(() => undefined);

    if (!res.ok) {
      throw new ApiError(`Request failed: ${res.status} ${res.statusText}`, res.status, data);
    }

    return data as T;
  }

  get<T = unknown>(path: string, init?: RequestInit) {
    return this.request<T>(path, 'GET', undefined, init);
  }
  post<T = unknown>(path: string, body?: unknown, init?: RequestInit) {
    return this.request<T>(path, 'POST', body, init);
  }
  put<T = unknown>(path: string, body?: unknown, init?: RequestInit) {
    return this.request<T>(path, 'PUT', body, init);
  }
  patch<T = unknown>(path: string, body?: unknown, init?: RequestInit) {
    return this.request<T>(path, 'PATCH', body, init);
  }
  delete<T = unknown>(path: string, init?: RequestInit) {
    return this.request<T>(path, 'DELETE', undefined, init);
  }
}

export const api = new ApiClient();
