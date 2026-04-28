'use client';

import { useState } from 'react';
import { donacionService } from '@/src/infrastructure/api/donacionService';
import { DonacionRequest } from '@/src/domain/models/donacion/DonacionRequest';
import { Donacion } from '@/src/domain/models/donacion/DonacionResponse';

interface State {
  loading: boolean;
  error: string | null;
  donacion: Donacion | null;
}

export function useCrearDonacion() {
  const [state, setState] = useState<State>({ loading: false, error: null, donacion: null });

  const crear = async (data: DonacionRequest): Promise<boolean> => {
    setState({ loading: true, error: null, donacion: null });
    try {
      const response = await donacionService.create(data);
      setState({ loading: false, error: null, donacion: response.data });
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al registrar la donación';
      setState({ loading: false, error: message, donacion: null });
      return false;
    }
  };

  return { ...state, crear };
}
