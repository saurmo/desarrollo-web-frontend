const TOKEN_KEY = 'auth_token';
const COOKIE_MAX_AGE = 60 * 60 * 24; // 1 día (igual que el JWT)

export const tokenStorage = {
  save: (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
    document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Strict`;
  },
  get: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
  },
  remove: (): void => {
    localStorage.removeItem(TOKEN_KEY);
    document.cookie = `${TOKEN_KEY}=; path=/; max-age=0`;
  },
};
