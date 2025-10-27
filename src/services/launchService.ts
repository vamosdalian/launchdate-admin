import { apiClient } from './apiClient';
import type { Launch } from '@/types';

export const launchService = {
  getAll: async (): Promise<Launch[]> => {
    return apiClient.get<Launch[]>('/api/v1/rocket-launches');
  },

  getById: async (id: number): Promise<Launch> => {
    return apiClient.get<Launch>(`/api/v1/rocket-launches/${id}`);
  },

  create: async (launch: Omit<Launch, 'id' | 'created_at' | 'updated_at'>): Promise<Launch> => {
    return apiClient.post<Launch>('/api/v1/rocket-launches', launch);
  },

  update: async (id: number, launch: Partial<Omit<Launch, 'id' | 'created_at' | 'updated_at'>>): Promise<{ message: string }> => {
    return apiClient.put<{ message: string }>(`/api/v1/rocket-launches/${id}`, launch);
  },

  delete: async (id: number): Promise<void> => {
    return apiClient.delete<void>(`/api/v1/rocket-launches/${id}`);
  },

  sync: async (limit?: number): Promise<{ message: string; count: number; limit: number }> => {
    const queryParam = limit ? `?limit=${limit}` : '';
    return apiClient.post<{ message: string; count: number; limit: number }>(`/api/v1/rocket-launches/sync${queryParam}`);
  },
};
