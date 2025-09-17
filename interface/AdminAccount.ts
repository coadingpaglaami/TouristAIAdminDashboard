export interface UserProfileResponseForAdmin {
  username: string;
  email: string;
  profile_picture_url: string | null;
}
export interface UpdatePasswordRequest {
  current_password: string;
  new_password: string;
  confirm_password: string;
}
