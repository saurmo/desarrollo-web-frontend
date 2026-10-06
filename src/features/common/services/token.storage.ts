import { AuthToken } from "../../login/domain/auth";
import { User } from "../../users/domain/User";

export const tokenStorage = {
    
  SAVE_KEY: 'auth_emerald_token',
  USER_KEY: 'auth_emerald_user',

  saveToken(token: AuthToken): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.SAVE_KEY, JSON.stringify(token));
      // Set cookie for Next.js Middleware evaluation compatibility
      document.cookie = `auth_token=${token.accessToken}; path=/; max-age=${token.expiresIn}; SameSite=Strict`;
    }
  },

  getToken(): AuthToken | null {
    if (typeof window === 'undefined') return null;
    const item = localStorage.getItem(this.SAVE_KEY);
    return item ? JSON.parse(item) : null;
  },

  saveUser(user: User): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }
  },

  getUser(): User | null {
    if (typeof window === 'undefined') return null;
    const item = localStorage.getItem(this.USER_KEY);
    return item ? JSON.parse(item) : null;
  },

  clear(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.SAVE_KEY);
      localStorage.removeItem(this.USER_KEY);
      document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  }
};
