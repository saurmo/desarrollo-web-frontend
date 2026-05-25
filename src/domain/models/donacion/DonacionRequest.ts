export interface DonacionRequest {
  total: number;
  description?: string;
  /** PDF o imagen; campo multipart `comprobante` en el backend */
  archivo?: File | null;
}
