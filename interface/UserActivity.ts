// User object type
interface User {
  username: string;
  profile_picture_url: string | null;
}

// Each result item
export interface ActivityResult {
  id: number;
  user: User;
  activity_type: string;
  time: string;
  status: string;
  photo: string;
  action: number;
}

// Results wrapper
interface Results {
  message: string;
  results: ActivityResult[];
}

// Root response
export interface UserActivityResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Results;
}
