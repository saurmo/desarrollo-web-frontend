'use client';

import { useCallback, useEffect, useState } from 'react';
import { donacionService } from '@/src/infrastructure/api/donacionService';
import { Donacion } from '@/src/domain/models/donacion/DonacionResponse';

interface State {
  donaciones: Donacion[];
  loading: boolean;
  error: string | null;
}

export function useMisDonaciones() {
  const [state, setState] = useState<State>({ donaciones: [], loading: true, error: null });

  const fetchAll = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const res = await donacionService.listMine();
      setState({ donaciones: res.data, loading: false, error: null });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar tus donaciones';
      setState((s) => ({ ...s, loading: false, error: message }));
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return { ...state, refetch: fetchAll };
}
