import { apiClient } from './apiClient';
import type { Company } from '@/types';

export const companyService = {
  getAll: async (): Promise<Company[]> => {
    return apiClient.get<Company[]>('/api/v1/companies');
  },

  getById: async (id: number): Promise<Company> => {
    return apiClient.get<Company>(`/api/v1/companies/${id}`);
  },

  create: async (company: Omit<Company, 'id' | 'created_at' | 'updated_at'>): Promise<Company> => {
    return apiClient.post<Company>('/api/v1/companies', company);
  },

  update: async (id: number, company: Partial<Omit<Company, 'id' | 'created_at' | 'updated_at'>>): Promise<{ message: string }> => {
    return apiClient.put<{ message: string }>(`/api/v1/companies/${id}`, company);
  },

  delete: async (id: number): Promise<void> => {
    return apiClient.delete<void>(`/api/v1/companies/${id}`);
  },
};
