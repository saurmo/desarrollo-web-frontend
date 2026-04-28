export interface Donacion {
  id: string;
  user_id: string | null;
  total: string;
  descripcion: string | null;
  created_at: string;
}

export interface DonacionResponse {
  data: Donacion;
  message: string;
}
