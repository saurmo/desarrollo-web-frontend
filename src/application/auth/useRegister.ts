'use client';

import { useState } from 'react';
import { authService } from '@/src/infrastructure/api/authService';
import { tokenStorage } from '@/src/infrastructure/storage/tokenStorage';
import { RegisterRequest } from '@/src/domain/models/auth/RegisterRequest';
import { UserRole } from '@/src/domain/models/Usuario';

interface RegisterState {
  loading: boolean;
  error: string | null;
}

export function useRegister() {
  const [state, setState] = useState<RegisterState>({ loading: false, error: null });

  const register = async (data: RegisterRequest): Promise<UserRole | null> => {
    setState({ loading: true, error: null });
    try {
      const response = await authService.register(data);
      tokenStorage.save(response.data.token);
      setState({ loading: false, error: null });
      return response.data.user.role;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al crear la cuenta';
      setState({ loading: false, error: message });
      return null;
    }
  };

  return { ...state, register };
}
