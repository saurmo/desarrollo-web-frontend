'use client';

import { useEffect, useState } from 'react';
import { tokenStorage } from '@/src/infrastructure/storage/tokenStorage';
import { UserRole } from '@/src/domain/models/Usuario';

interface TokenPayload {
  userId: string;
  name: string;
  email: string;
  role: UserRole;
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
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = tokenStorage.get();
    if (token) setUsuario(decodeToken(token));
    setReady(true);
  }, []);

  const logout = () => {
    tokenStorage.remove();
    window.location.href = '/login';
  };

  return {
    usuario,
    logout,
    isAuthenticated: !!usuario,
    isAdmin: usuario?.role === 'admin',
    isDonante: usuario?.role === 'donante',
    ready,
  };
}
