import { useQuery } from '@tanstack/react-query';
import { NewsService, type NewsDTO } from '@/api/news';

export function useNews(page = 1) {
  return useQuery<{ results: NewsDTO[]; count?: number }, Error>({
    queryKey: ['news', page],
    queryFn: () => NewsService.list({ page }),
    staleTime: 60_000,
  });
}
