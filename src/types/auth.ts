export interface User {
  id: string;
  email: string;
  fullName?: string;
  role?: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password?: string;
}
