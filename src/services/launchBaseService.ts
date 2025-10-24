import { apiClient } from './apiClient';
import type { LaunchBase } from '@/types';

export const launchBaseService = {
  getAll: async (): Promise<LaunchBase[]> => {
    return apiClient.get<LaunchBase[]>('/api/launch-bases');
  },

  getById: async (id: string): Promise<LaunchBase> => {
    return apiClient.get<LaunchBase>(`/api/launch-bases/${id}`);
  },

  create: async (base: Omit<LaunchBase, 'id'>): Promise<LaunchBase> => {
    return apiClient.post<LaunchBase>('/api/launch-bases', base);
  },

  update: async (id: string, base: Partial<LaunchBase>): Promise<LaunchBase> => {
    return apiClient.put<LaunchBase>(`/api/launch-bases/${id}`, base);
  },

  delete: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/api/launch-bases/${id}`);
  },
};
