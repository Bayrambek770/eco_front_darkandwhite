import { OrdersService } from './orders';

export const CheckoutService = {
  async placeOrder(payload: {
    shipping_name: string;
    shipping_address: string;
    billing_name?: string;
    billing_address?: string;
  }) {
    return OrdersService.create(payload);
  },
};
