import { http } from './http';

export interface OrderItemDTO { product: string | number; quantity: number; price: number }
export interface OrderDTO {
  id: string | number;
  items: OrderItemDTO[];
  total_price: number;
  status: 'Pending' | 'Paid' | 'Shipped' | 'Completed';
  created_at: string;
  shipping_name?: string;
  shipping_address?: string;
  billing_name?: string;
  billing_address?: string;
}

export const OrdersService = {
  create(payload: {
    shipping_name: string;
    shipping_address: string;
    billing_name?: string;
    billing_address?: string;
  }): Promise<OrderDTO> {
    return http.post('/orders/', payload);
  },
  get(id: string | number): Promise<OrderDTO> {
    return http.get(`/orders/${id}/`).then(r => r.data);
  },
  updateStatus(id: string | number, payload: { status: OrderDTO['status'] }) {
    return http.patch(`/orders/${id}/`, payload).then(r => r.data);
  },
};
