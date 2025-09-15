interface ReportItem {
  label: string;
  count: number;
}

export interface ReturningUsersResponse {
  weekly: ReportItem[];
  monthly: ReportItem[];
  yearly: ReportItem[];
}
export interface AnalyticsUserStatusDistribution {
  total: number;
  free_count: number;
  premium_count: number;
  free_percentage: number;
  premium_percentage: number;
}
interface TopUser {
  username: string;
  avatar_url: string | null;
  revenue: number;
}

export interface AnalyticsRevenueStatsResponse {
  top_users: TopUser[];
  average_revenue_per_user: number;
  growth_percentage: number;
}

export interface RevenueGrowthItem {
  month: string;
  total: number;
}

export interface RevenueGrowthDataResponse {
  revenue_growth: RevenueGrowthItem[];
  total_revenue: number;
}
