export interface ManageUsersResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    message: string;
    results: User[];
  };
}

export interface User {
  id: number;
  user: {
    username: string;
    avatar: string | null;
  };
  status: {
    text: string;
    badge: string;
  };
  subscription: {
    text: string;
    badge: string;
  };
  email: string;
  search_history: number;
  last_active: string;
  actions: {
    edit_id: number;
    can_ban: boolean | null;
    can_unban: boolean | null;
  };
}