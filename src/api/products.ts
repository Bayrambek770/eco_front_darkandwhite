import type { Product } from '@/contexts/CartContext';
import { http } from './http';

export interface ProductsListResponse {
  results: Product[];
  count?: number;
}

export type ProductsQuery = Partial<{
  category: 'CPU' | 'GPU' | 'Monoblock' | 'Monitor';
  brand: string;
  search: string;
  ordering: 'price' | 'created_at' | 'name' | `-${'price' | 'created_at' | 'name'}`;
  page: number;
}>;

export const ProductsService = {
  async list(params: ProductsQuery = {}): Promise<ProductsListResponse> {
    const q = new URLSearchParams();
    if (params.category) q.set('category', params.category);
    if (params.brand) q.set('brand', params.brand);
    if (params.search) q.set('search', params.search);
    if (params.ordering) q.set('ordering', params.ordering);
    if (params.page) q.set('page', String(params.page));
    return http
      .get<any>(`/products/${q.toString() ? `?${q}` : ''}`)
      .then((r) => {
        const data = r.data;
        const normalize = (raw: any): Product => {
          const firstImage = Array.isArray(raw?.images) && raw.images.length
            ? (typeof raw.images[0] === 'string' ? raw.images[0] : raw.images[0]?.url || raw.images[0]?.image || '')
            : undefined;
          const image = raw?.image || raw?.image_url || raw?.thumbnail || raw?.cover || firstImage || '';
          return {
            id: String(raw?.id ?? raw?.uuid ?? raw?.slug ?? Math.random().toString(36).slice(2)),
            name: String(raw?.name ?? raw?.title ?? 'Product'),
            category: (raw?.category ?? raw?.type ?? 'CPU') as Product['category'],
            price: Number(raw?.price ?? raw?.price_usd ?? raw?.cost ?? 0),
            image,
            description: String(raw?.description ?? raw?.content ?? raw?.summary ?? ''),
            specs: Array.isArray(raw?.specs) ? raw.specs : [],
          };
        };

        if (Array.isArray(data)) {
          return { results: data.map(normalize), count: data.length } as ProductsListResponse;
        }
        const results = Array.isArray(data?.results) ? data.results.map(normalize) : [];
        const count = typeof data?.count === 'number' ? data.count : results.length;
        return { results, count } as ProductsListResponse;
      });
  },
  async mostSold(): Promise<ProductsListResponse> {
    return http.get<any>(`/products/most-sold/`).then((r) => {
      const data = r.data;
      const normalize = (raw: any): Product => {
        const firstImage = Array.isArray(raw?.images) && raw.images.length
          ? (typeof raw.images[0] === 'string' ? raw.images[0] : raw.images[0]?.url || raw.images[0]?.image || '')
          : undefined;
        const image = raw?.image || raw?.image_url || raw?.thumbnail || raw?.cover || firstImage || '';
        return {
          id: String(raw?.id ?? raw?.uuid ?? raw?.slug ?? Math.random().toString(36).slice(2)),
          name: String(raw?.name ?? raw?.title ?? 'Product'),
          category: (raw?.category ?? raw?.type ?? 'CPU') as Product['category'],
          price: Number(raw?.price ?? raw?.price_usd ?? raw?.cost ?? 0),
          image,
          description: String(raw?.description ?? raw?.content ?? raw?.summary ?? ''),
          specs: Array.isArray(raw?.specs) ? raw.specs : [],
        };
      };
      if (Array.isArray(data)) {
        return { results: data.map(normalize).slice(0, 6), count: data.length } as ProductsListResponse;
      }
      const results = Array.isArray(data?.results) ? data.results.map(normalize) : [];
      const count = typeof data?.count === 'number' ? data.count : results.length;
      return { results: results.slice(0, 6), count } as ProductsListResponse;
    });
  },
  async recommended(): Promise<ProductsListResponse> {
    return http.get<any>(`/products/recommended/`).then((r) => {
      const data = r.data;
      const normalize = (raw: any): Product => {
        const firstImage = Array.isArray(raw?.images) && raw.images.length
          ? (typeof raw.images[0] === 'string' ? raw.images[0] : raw.images[0]?.url || raw.images[0]?.image || '')
          : undefined;
        const image = raw?.image || raw?.image_url || raw?.thumbnail || raw?.cover || firstImage || '';
        return {
          id: String(raw?.id ?? raw?.uuid ?? raw?.slug ?? Math.random().toString(36).slice(2)),
          name: String(raw?.name ?? raw?.title ?? 'Product'),
          category: (raw?.category ?? raw?.type ?? 'CPU') as Product['category'],
          price: Number(raw?.price ?? raw?.price_usd ?? raw?.cost ?? 0),
          image,
          description: String(raw?.description ?? raw?.content ?? raw?.summary ?? ''),
          specs: Array.isArray(raw?.specs) ? raw.specs : [],
        };
      };
      if (Array.isArray(data)) {
        return { results: data.map(normalize).slice(0, 6), count: data.length } as ProductsListResponse;
      }
      const results = Array.isArray(data?.results) ? data.results.map(normalize) : [];
      const count = typeof data?.count === 'number' ? data.count : results.length;
      return { results: results.slice(0, 6), count } as ProductsListResponse;
    });
  },
  get(id: string | number) {
    return http.get<any>(`/products/${id}/`).then(r => {
      const raw = r.data;
      const rawImages: any[] = Array.isArray(raw?.images)
        ? raw.images
        : Array.isArray(raw?.photos)
        ? raw.photos
        : Array.isArray(raw?.gallery)
        ? raw.gallery
        : Array.isArray(raw?.media)
        ? raw.media
        : [];
      const images: string[] = rawImages
        .map((it) => (typeof it === 'string' ? it : it?.url || it?.image || it?.src || ''))
        .filter(Boolean);
      const firstImage = images[0];
      const image = raw?.image || raw?.image_url || raw?.thumbnail || raw?.cover || firstImage || '';
      const product: Product = {
        id: String(raw?.id ?? id),
        name: String(raw?.name ?? raw?.title ?? 'Product'),
        category: (raw?.category ?? raw?.type ?? 'CPU') as Product['category'],
        price: Number(raw?.price ?? raw?.price_usd ?? raw?.cost ?? 0),
        image,
        description: String(raw?.description ?? raw?.content ?? raw?.summary ?? ''),
        specs: Array.isArray(raw?.specs) ? raw.specs : [],
      };
      // Attach full images array for detail pages (loose typing on purpose)
      (product as any).images = images.length ? images : (image ? [image] : []);
      return product;
    });
  },
  listReviews(productId: string | number, page = 1) {
    const q = new URLSearchParams();
    if (page) q.set('page', String(page));
    return http
      .get<any>(`/products/${productId}/reviews/${q.toString() ? `?${q}` : ''}`)
      .then((r) => {
        const data = r.data;
        const normalize = (raw: any) => ({
          id: raw?.id ?? raw?.uuid ?? Math.random().toString(36).slice(2),
          user: raw?.user ?? raw?.author ?? raw?.username ?? raw?.user_name,
          rating: raw?.rating ?? raw?.rate ?? raw?.stars ?? raw?.score,
          content: String(raw?.content ?? raw?.comment ?? raw?.text ?? raw?.body ?? raw?.review ?? ''),
          created_at: String(
            raw?.created_at ?? raw?.created ?? raw?.date ?? raw?.createdAt ?? raw?.timestamp ?? new Date().toISOString(),
          ),
        });
        if (Array.isArray(data)) {
          return { results: data.map(normalize), count: data.length } as {
            results: Array<{ id: string | number; user?: string; rating?: number; content: string; created_at: string }>;
            count?: number;
          };
        }
        const results = Array.isArray(data?.results) ? data.results.map(normalize) : [];
        const count = typeof data?.count === 'number' ? data.count : results.length;
        return { results, count } as {
          results: Array<{ id: string | number; user?: string; rating?: number; content: string; created_at: string }>;
          count?: number;
        };
      });
  },
  addReview(productId: string | number, payload: { rating?: number; content: string }) {
    const body: any = { comment: payload.content };
    if (payload.rating != null) body.rating = payload.rating;
    return http.post(`/products/${productId}/reviews/`, body).then(r => r.data);
  },
};
