export interface Donacion {
  id: string;
  userId: string | null;
  total: number;
  description: string | null;
  receiptUrl?: string | null;
  createdAt: string;
}

export interface DonacionDonor {
  id: string;
  name: string;
  lastName: string;
  email: string;
}

export interface DonacionWithDonor extends Donacion {
  donor: DonacionDonor | null;
}

export interface DonacionResponse {
  data: Donacion;
}

export interface DonacionesMineResponse {
  data: Donacion[];
}

export interface DonacionesAllResponse {
  data: DonacionWithDonor[];
}
