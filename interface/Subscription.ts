export interface SubscriptionPlansResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: SubscriptionPlan[];
}

export interface SubscriptionPlan {
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