'use client';

import { useCallback, useEffect, useState } from 'react';
import { donacionService } from '@/src/infrastructure/api/donacionService';
import { DonacionWithDonor } from '@/src/domain/models/donacion/DonacionResponse';

interface State {
  donaciones: DonacionWithDonor[];
  loading: boolean;
  error: string | null;
}

export function useTodasDonaciones() {
  const [state, setState] = useState<State>({ donaciones: [], loading: true, error: null });

  const fetchAll = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const res = await donacionService.listAll();
      setState({ donaciones: res.data, loading: false, error: null });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar donaciones';
      setState((s) => ({ ...s, loading: false, error: message }));
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return { ...state, refetch: fetchAll };
}
