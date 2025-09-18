export interface SubscriptionPlansResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: SubscriptionPlanInfo[];
}

export interface SubscriptionPlanInfo {
  id: number;
  name: string;
  duration: string;
  price: string;
  status: string;       // e.g. "Active" | "Inactive"
  is_paused: boolean;
  currency: string;     // e.g. "HKD"
  description: string;
  stripe_price_id: string;
}
export interface PopularPlan {
  name: string;
  percentage: string;
  description: string;
  icon: string;
  subscriber_count: number;
}

export interface PopularPlansResponse {
  most_popular: PopularPlan[];
}
export interface UserInfo {
  avatar: string | null;
  name: string;
}

export interface Status {
  text: string;
  badge: string;
}

export interface UserEarning {
  user: UserInfo;
  email: string;
  subscription: string;
  total_spent: string;
  purchase_date: string; // ISO date string
  card: string | null;
  status: Status;
}

export interface UserEarningsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: UserEarning[];
}
export interface Plan {
  id: number;
  name: string;
  duration: string;
  price: string;
  status: "Active" | "Inactive";  // since only these appear
  is_paused: boolean;
  currency: string;
  description: string;
  stripe_price_id: string;
}
export type PlansResponse = Plan[];
