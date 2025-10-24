import { apiClient } from './apiClient';

export interface DashboardStats {
  totalRockets: number;
  upcomingLaunches: number;
  newsArticles: number;
  launchBases: number;
  companies: number;
}

export const statsService = {
  getStats: async (): Promise<DashboardStats> => {
    return apiClient.get<DashboardStats>('/api/stats');
  },
};
