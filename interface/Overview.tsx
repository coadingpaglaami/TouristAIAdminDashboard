export interface OverviewResponse {
  greeting: string;
  period: "weekly" | "monthly" | "yearly" | string; // can extend as needed
  overview: {
    total_users: number;
    new_users: number;
    premium_users: number;
    inactive_users: number;
    daily_avg_active_user: number;
    boosting_stats: {
      total_boosted_hours: number;
      boosting_engagement_rate: number;
    };
    search_activity: {
      total_searches: number;
      search_engagement_rate: number;
    };
    premium_insights: {
      active_premium_user: number;
      renewal_rate: number;
      churn_rate: number;
    };
    search_frequency: {
      name: string;
      status: "free" | "premium" | string; // extendable
      search_history: number;
    }[];
  };
}
