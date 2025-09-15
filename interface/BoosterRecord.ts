export interface BoosterRecordResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    message: string;
    results: UserSubscription[];
  };
}

export interface UserSubscription {
  id: number;
  user: {
    username: string;
    avatar: string | null;
  };
  subscription_name: string;
  activate_time: string; // could be Date if you parse
  expire_time: string;   // could be Date if you parse
  amount: string;        // comes as string ("18.00")
  last_active: string;   // e.g. "Sep 14, 2025"
  action: {
    delete: number;
    pause_play: "pause" | "play"; // since backend seems to send either
  };
}