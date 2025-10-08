import { http } from './http';
import tokenStore, { type Tokens } from './tokenStore';

export interface Profile {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  shipping_address?: string;
}

export const AuthService = {
  async signup(payload: { username: string; password: string; email?: string; password_confirm?: string }) {
    return http.post('/auth/signup/', payload).then(r => r.data);
  },
  async login(payload: { username: string; password: string }) {
    const { data } = await http.post<Tokens>('/token/', payload);
    tokenStore.setTokens(data);
    return data;
  },
  async refresh() {
    const refresh = tokenStore.getRefreshToken();
    if (!refresh) throw new Error('No refresh token');
    const { data } = await http.post<Tokens>('/token/refresh/', { refresh });
    tokenStore.setTokens(data);
    return data;
  },
  async logout() {
    const refresh = tokenStore.getRefreshToken();
    if (refresh) await http.post('/auth/logout/', { refresh });
    tokenStore.clear();
  },
  async profile() {
    return http.get<Profile>('/auth/profile/').then(r => r.data);
  },
  async updateProfile(patch: Partial<Profile>) {
    return http.patch<Profile>('/auth/profile/', patch).then(r => r.data);
  },
};
