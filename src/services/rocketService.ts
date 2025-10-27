import { apiClient } from './apiClient';
import type { Rocket } from '@/types';

export const rocketService = {
  getAll: async (): Promise<Rocket[]> => {
    return apiClient.get<Rocket[]>('/api/v1/rockets');
  },

  getById: async (id: number): Promise<Rocket> => {
    return apiClient.get<Rocket>(`/api/v1/rockets/${id}`);
  },

  create: async (rocket: Omit<Rocket, 'id' | 'created_at' | 'updated_at'>): Promise<Rocket> => {
    return apiClient.post<Rocket>('/api/v1/rockets', rocket);
  },

  update: async (id: number, rocket: Partial<Omit<Rocket, 'id' | 'created_at' | 'updated_at'>>): Promise<{ message: string }> => {
    return apiClient.put<{ message: string }>(`/api/v1/rockets/${id}`, rocket);
  },

  delete: async (id: number): Promise<void> => {
    return apiClient.delete<void>(`/api/v1/rockets/${id}`);
  },
};
