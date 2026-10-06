import { User } from "../../users/domain/User";



export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthToken {
  accessToken: string;
  expiresIn: number; // in seconds
  tokenType: string;
}

export interface LoginState {
  isLoading: boolean;
  error: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

export interface ValidationErrors {
  email?: string;
  password?: string;
}