export interface DonacionRequest {
  user_id?: string;
  total: number;
  descripcion?: string;
  /** PDF o imagen; campo multipart `comprobante` en el backend */
  archivo?: File | null;
}
