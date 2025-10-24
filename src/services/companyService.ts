import { apiClient } from './apiClient';
import type { Company } from '@/types';

export const companyService = {
  getAll: async (): Promise<Company[]> => {
    return apiClient.get<Company[]>('/api/companies');
  },

  getById: async (id: string): Promise<Company> => {
    return apiClient.get<Company>(`/api/companies/${id}`);
  },

  create: async (company: Omit<Company, 'id'>): Promise<Company> => {
    return apiClient.post<Company>('/api/companies', company);
  },

  update: async (id: string, company: Partial<Company>): Promise<Company> => {
    return apiClient.put<Company>(`/api/companies/${id}`, company);
  },

  delete: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/api/companies/${id}`);
  },
};
