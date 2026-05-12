export interface Donacion {
  id: string;
  user_id: string | null;
  total: string;
  descripcion: string | null;
  created_at: string;
  /** Ruta relativa servida por el backend bajo `/uploads/...` */
  comprobante_url?: string | null;
}

export interface DonacionResponse {
  data: Donacion;
  message: string;
}
