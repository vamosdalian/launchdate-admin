import { apiClient } from './apiClient';
import type { Rocket } from '@/types';

export const rocketService = {
  getAll: async (): Promise<Rocket[]> => {
    return apiClient.get<Rocket[]>('/api/v1/rockets');
  },

  getById: async (id: string): Promise<Rocket> => {
    return apiClient.get<Rocket>(`/api/v1/rockets/${id}`);
  },

  create: async (rocket: Omit<Rocket, 'id'>): Promise<Rocket> => {
    return apiClient.post<Rocket>('/api/v1/rockets', rocket);
  },

  update: async (id: string, rocket: Partial<Rocket>): Promise<Rocket> => {
    return apiClient.put<Rocket>(`/api/v1/rockets/${id}`, rocket);
  },

  delete: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/api/v1/rockets/${id}`);
  },
};
