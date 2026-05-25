'use client';

import { useState, useCallback } from 'react';
import {
  usuarioApiService,
  UsuarioPublico,
  ActualizarUsuarioPayload,
} from '@/src/infrastructure/api/usuarioApiService';

interface State {
  usuarios: UsuarioPublico[];
  loading: boolean;
  error: string | null;
}

export function useUsuarios() {
  const [state, setState] = useState<State>({ usuarios: [], loading: false, error: null });

  const fetchAll = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const res = await usuarioApiService.getAll();
      setState({ usuarios: res.data, loading: false, error: null });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar usuarios';
      setState((s) => ({ ...s, loading: false, error: message }));
    }
  }, []);

  const update = async (id: string, data: ActualizarUsuarioPayload): Promise<boolean> => {
    try {
      const res = await usuarioApiService.update(id, data);
      setState((s) => ({
        ...s,
        usuarios: s.usuarios.map((u) => (u.id === id ? { ...u, ...res.data } : u)),
      }));
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al actualizar usuario';
      setState((s) => ({ ...s, error: message }));
      return false;
    }
  };

  const remove = async (id: string): Promise<boolean> => {
    try {
      await usuarioApiService.remove(id);
      setState((s) => ({ ...s, usuarios: s.usuarios.filter((u) => u.id !== id) }));
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al eliminar usuario';
      setState((s) => ({ ...s, error: message }));
      return false;
    }
  };

  return { ...state, fetchAll, update, remove };
}
