export interface RegisterResponse {
  data: {
    token: string;
    usuario: {
      id: number;
      nombre: string;
      apellidos: string;
      email: string;
    };
  };
}
