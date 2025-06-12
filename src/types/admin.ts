export interface AdminCredentials {
  username: string;
  password: string;
}

export interface AdminState {
  isAuthenticated: boolean;
  username: string | null;
}