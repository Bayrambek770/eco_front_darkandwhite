import { useQuery } from '@tanstack/react-query';
import type { Product } from '@/contexts/CartContext';
import { ProductsService, type ProductsQuery, type ProductsListResponse } from '@/api/products';
import { useTranslation } from 'react-i18next';

export function useProducts(params: ProductsQuery = {}) {
  const { i18n } = useTranslation();
  return useQuery<ProductsListResponse, Error>({
    queryKey: ['products', params, i18n.language],
    queryFn: () => ProductsService.list(params),
    staleTime: 60_000,
  });
}

export function useMostSold() {
  const { i18n } = useTranslation();
  return useQuery<ProductsListResponse, Error>({
    queryKey: ['products', 'most-sold', i18n.language],
    queryFn: () => ProductsService.mostSold(),
    staleTime: 60_000,
  });
}

export function useRecommended() {
  const { i18n } = useTranslation();
  return useQuery<ProductsListResponse, Error>({
    queryKey: ['products', 'recommended', i18n.language],
    queryFn: () => ProductsService.recommended(),
    staleTime: 30_000,
  });
}
