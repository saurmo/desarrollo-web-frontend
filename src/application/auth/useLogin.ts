'use client';

import { useState } from 'react';
import { authService } from '@/src/infrastructure/api/authService';
import { tokenStorage } from '@/src/infrastructure/storage/tokenStorage';
import { LoginRequest } from '@/src/domain/models/auth/LoginRequest';
import { UserRole } from '@/src/domain/models/Usuario';

interface LoginState {
  loading: boolean;
  error: string | null;
}

export function useLogin() {
  const [state, setState] = useState<LoginState>({ loading: false, error: null });

  const login = async (credentials: LoginRequest): Promise<UserRole | null> => {
    setState({ loading: true, error: null });
    try {
      const response = await authService.login(credentials);
      tokenStorage.save(response.data.token);
      setState({ loading: false, error: null });
      return response.data.user.role;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al iniciar sesión';
      setState({ loading: false, error: message });
      return null;
    }
  };

  return { ...state, login };
}
