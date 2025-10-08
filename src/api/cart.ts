import { http } from './http';
import type { Product } from '@/contexts/CartContext';

export interface CartItemDTO { id: string; product: Product; quantity: number; price: number }
export interface CartDTO { items: CartItemDTO[]; total_price: number }

export const CartService = {
  get(): Promise<CartDTO> {
    return http.get('/cart/').then(r => r.data);
  },
  add(payload: { product?: string | number; product_id?: string | number; quantity?: number }) {
    return http.post('/cart/add/', payload).then(r => r.data);
  },
  updateItem(itemId: string | number, payload: { quantity: number }) {
    return http.patch(`/cart/items/${itemId}/`, payload).then(r => r.data);
  },
  removeItem(itemId: string | number) {
    return http.delete(`/cart/items/${itemId}/remove/`).then(r => r.data);
  },
};
