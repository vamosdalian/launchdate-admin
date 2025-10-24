import { apiClient } from './apiClient';
import type { News } from '@/types';

export const newsService = {
  getAll: async (): Promise<News[]> => {
    return apiClient.get<News[]>('/api/news');
  },

  getById: async (id: string): Promise<News> => {
    return apiClient.get<News>(`/api/news/${id}`);
  },

  create: async (news: Omit<News, 'id'>): Promise<News> => {
    return apiClient.post<News>('/api/news', news);
  },

  update: async (id: string, news: Partial<News>): Promise<News> => {
    return apiClient.put<News>(`/api/news/${id}`, news);
  },

  delete: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/api/news/${id}`);
  },
};
