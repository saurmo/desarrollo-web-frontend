'use client';

import { useEffect, useState } from 'react';
import { tokenStorage } from '@/src/infrastructure/storage/tokenStorage';

interface TokenPayload {
  id: string;
  name: string;
  email: string;
}

function decodeToken(token: string): TokenPayload | null {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload)) as TokenPayload;
  } catch {
    return null;
  }
}

export function useAuth() {
  const [usuario, setUsuario] = useState<TokenPayload | null>(null);

  useEffect(() => {
    const token = tokenStorage.get();
    if (token) setUsuario(decodeToken(token));
  }, []);

  const logout = () => {
    tokenStorage.remove();
    window.location.href = '/login';
  };

  return { usuario, logout, isAuthenticated: !!usuario };
}
