import { http } from './http';

export const PublicOfferService = {
  get() {
    return http.get<{ content: string }>(`/public-offer/`).then(r => r.data);
  },
};
