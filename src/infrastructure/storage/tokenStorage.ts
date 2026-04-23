const TOKEN_KEY = 'auth_token';

export const tokenStorage = {
  save: (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
  },
  get: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },
  remove: (): void => {
    localStorage.removeItem(TOKEN_KEY);
  },
};
