import { httpClient } from '../http/httpClient';
import { UserRole } from '@/src/domain/models/Usuario';

export interface UsuarioPublico {
  id: string;
  name: string;
  lastName: string;
  email: string;
  role: UserRole;
  profilePhoto?: string | null;
  createdAt: string;
}

export interface ActualizarUsuarioPayload {
  name?: string;
  lastName?: string;
  email?: string;
}

export const usuarioApiService = {
  getAll: (): Promise<{ data: UsuarioPublico[] }> =>
    httpClient.get('/api/v1/users'),

  getById: (id: string): Promise<{ data: UsuarioPublico }> =>
    httpClient.get(`/api/v1/users/${id}`),

  update: (id: string, data: ActualizarUsuarioPayload): Promise<{ data: UsuarioPublico }> =>
    httpClient.put(`/api/v1/users/${id}`, data),

  remove: (id: string): Promise<void> =>
    httpClient.delete(`/api/v1/users/${id}`),
};
