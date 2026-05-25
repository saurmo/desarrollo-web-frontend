import { Usuario } from '../Usuario';

export interface RegisterResponse {
  data: {
    token: string;
    user: Usuario;
  };
}
