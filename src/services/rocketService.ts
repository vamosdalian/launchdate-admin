import { apiClient } from './apiClient';
import type { Rocket } from '@/types';

export const rocketService = {
  getAll: async (): Promise<Rocket[]> => {
    return apiClient.get<Rocket[]>('/api/rockets');
  },

  getById: async (id: string): Promise<Rocket> => {
    return apiClient.get<Rocket>(`/api/rockets/${id}`);
  },

  create: async (rocket: Omit<Rocket, 'id'>): Promise<Rocket> => {
    return apiClient.post<Rocket>('/api/rockets', rocket);
  },

  update: async (id: string, rocket: Partial<Rocket>): Promise<Rocket> => {
    return apiClient.put<Rocket>(`/api/rockets/${id}`, rocket);
  },

  delete: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/api/rockets/${id}`);
  },
};
