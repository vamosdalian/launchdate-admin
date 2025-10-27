import { apiClient } from './apiClient';
import type { LaunchBase } from '@/types';

export const launchBaseService = {
  getAll: async (): Promise<LaunchBase[]> => {
    return apiClient.get<LaunchBase[]>('/api/v1/launch-bases');
  },

  getById: async (id: number): Promise<LaunchBase> => {
    return apiClient.get<LaunchBase>(`/api/v1/launch-bases/${id}`);
  },

  create: async (base: Omit<LaunchBase, 'id' | 'created_at' | 'updated_at'>): Promise<LaunchBase> => {
    return apiClient.post<LaunchBase>('/api/v1/launch-bases', base);
  },

  update: async (id: number, base: Partial<Omit<LaunchBase, 'id' | 'created_at' | 'updated_at'>>): Promise<{ message: string }> => {
    return apiClient.put<{ message: string }>(`/api/v1/launch-bases/${id}`, base);
  },

  delete: async (id: number): Promise<void> => {
    return apiClient.delete<void>(`/api/v1/launch-bases/${id}`);
  },
};
