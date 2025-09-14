export interface AnalyticsResponse {
  returning_users: {
    weekly: ReturningUser[];
    monthly: ReturningUser[];
    yearly: ReturningUser[];
  };
  user_status_distribution: UserStatusDistribution;
  revenue_growth: RevenueGrowth[];
  revenue_leaderboard: RevenueLeaderboard;
}

interface ReturningUser {
  label: string;
  count: number;
}

export interface UserStatusDistribution {
  total: number;
  free_count?: number;
  premium_count?: number;
  free_percentage: number;
  premium_percentage: number;
}

interface RevenueGrowth {
  month: number;
  total: number;
}

interface RevenueLeaderboard {
  top_users: RevenueUser[];
  average_revenue_per_user: number;
  growth_percentage: number;
}

interface RevenueUser {
  username: string;
  avatar_url: string | null;
  revenue: number;
}
