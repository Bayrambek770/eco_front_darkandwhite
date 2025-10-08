import { http } from './http';

export const ContactService = {
  submit(payload: { name: string; email: string; message: string }) {
    return http.post('/contact/', payload).then(r => r.data);
  },
};
