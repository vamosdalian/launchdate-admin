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
    // Note: This endpoint is not yet implemented in the backend
    // It should return aggregated statistics for the dashboard
    return apiClient.get<DashboardStats>('/api/v1/stats');
  },
};
