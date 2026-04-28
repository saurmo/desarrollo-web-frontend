import { httpClient } from '../http/httpClient';

export interface UsuarioPublico {
  id: string;
  nombre: string;
  apellidos: string;
  email: string;
  created_at: string;
}

export interface CrearUsuarioPayload {
  nombre: string;
  apellidos: string;
  email: string;
  password: string;
  acepta_terminos: boolean;
}

export interface ActualizarUsuarioPayload {
  nombre?: string;
  apellidos?: string;
  email?: string;
}

export const usuarioApiService = {
  getAll: (): Promise<{ data: UsuarioPublico[] }> =>
    httpClient.get('/api/v1/usuarios'),

  getById: (id: string): Promise<{ data: UsuarioPublico }> =>
    httpClient.get(`/api/v1/usuarios/${id}`),

  create: (data: CrearUsuarioPayload): Promise<{ data: UsuarioPublico }> =>
    httpClient.post('/api/v1/usuarios', data),

  update: (id: string, data: ActualizarUsuarioPayload): Promise<{ data: UsuarioPublico }> =>
    httpClient.put(`/api/v1/usuarios/${id}`, data),

  remove: (id: string): Promise<{ message: string }> =>
    httpClient.delete(`/api/v1/usuarios/${id}`),
};
