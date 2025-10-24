import { apiClient } from './apiClient';
import type { Launch } from '@/types';

export const launchService = {
  getAll: async (): Promise<Launch[]> => {
    return apiClient.get<Launch[]>('/api/launches');
  },

  getById: async (id: string): Promise<Launch> => {
    return apiClient.get<Launch>(`/api/launches/${id}`);
  },

  create: async (launch: Omit<Launch, 'id'>): Promise<Launch> => {
    return apiClient.post<Launch>('/api/launches', launch);
  },

  update: async (id: string, launch: Partial<Launch>): Promise<Launch> => {
    return apiClient.put<Launch>(`/api/launches/${id}`, launch);
  },

  delete: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/api/launches/${id}`);
  },

  sync: async (): Promise<{ message: string; count: number }> => {
    return apiClient.post<{ message: string; count: number }>('/api/v1/rocket-launches/sync');
  },
};
