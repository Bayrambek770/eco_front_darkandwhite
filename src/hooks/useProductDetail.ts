import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ProductsService } from '@/api/products';
import { useTranslation } from 'react-i18next';

export function useProductDetail(id: string | number) {
  const { i18n } = useTranslation();
  return useQuery({ queryKey: ['product', id, i18n.language], queryFn: () => ProductsService.get(id), enabled: !!id });
}

export function useProductReviews(productId: string | number, page = 1) {
  // Reviews are typically user-generated and not localized; keep key stable
  return useQuery({ queryKey: ['product-reviews', productId, page], queryFn: () => ProductsService.listReviews(productId, page), enabled: !!productId });
}

export function useAddReview(productId: string | number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: { rating?: number; content: string }) => ProductsService.addReview(productId, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['product-reviews', productId] });
    },
  });
}
