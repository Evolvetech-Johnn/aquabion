'use client';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import newsService from '@/services/newsService';
import { NewsFilterOptions } from '@/types/news';

export const useNews = (options?: NewsFilterOptions) => {
  return useInfiniteQuery({
    queryKey: ['news', options],
    queryFn: ({ pageParam = 1 }) =>
      newsService.fetchNews({ ...options, page: pageParam as number }),
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? (lastPage.articles.length / (options?.limit || 10)) + 1 : undefined;
    },
    initialPageParam: 1,
  });
};

export const useNewsArticle = (id: string) => {
  return useQuery({
    queryKey: ['news', 'article', id],
    queryFn: () => newsService.fetchArticleById(id),
    enabled: !!id,
  });
};
