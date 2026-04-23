'use client';

import { useState } from 'react';
import { authService } from '@/src/infrastructure/api/authService';
import { tokenStorage } from '@/src/infrastructure/storage/tokenStorage';
import { LoginRequest } from '@/src/domain/models/auth/LoginRequest';

interface LoginState {
  loading: boolean;
  error: string | null;
}

export function useLogin() {
  const [state, setState] = useState<LoginState>({ loading: false, error: null });

  const login = async (credentials: LoginRequest): Promise<boolean> => {
    setState({ loading: true, error: null });
    try {
      const response = await authService.login(credentials);
      tokenStorage.save(response.data.token);
      setState({ loading: false, error: null });
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al iniciar sesión';
      setState({ loading: false, error: message });
      return false;
    }
  };

  return { ...state, login };
}
