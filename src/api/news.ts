import { http } from './http';

export interface NewsDTO { id: number | string; title: string; content: string; image: string; created_at: string }

export const NewsService = {
  async list(params?: { page?: number }) {
    const q = new URLSearchParams();
    if (params?.page) q.set('page', String(params.page));
    return http.get<{ results: NewsDTO[]; count?: number }>(`/news/${q.toString() ? `?${q}` : ''}`).then(r => r.data);
  },
  get(id: number | string) {
    return http.get<NewsDTO>(`/news/${id}/`).then(r => r.data);
  },
};
