import { Usuario } from '../Usuario';

export interface LoginResponse {
  data: {
    token: string;
    user: Usuario;
  };
}
