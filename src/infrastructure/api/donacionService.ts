import { DonacionRequest } from '@/src/domain/models/donacion/DonacionRequest';
import {
  DonacionResponse,
  DonacionesAllResponse,
  DonacionesMineResponse,
} from '@/src/domain/models/donacion/DonacionResponse';
import { httpClient } from '../http/httpClient';

function buildDonacionFormData(data: DonacionRequest): FormData {
  const form = new FormData();
  form.append('total', String(data.total));
  if (data.description !== undefined && data.description !== '') {
    form.append('description', data.description);
  }
  if (data.archivo) {
    form.append('comprobante', data.archivo);
  }
  return form;
}

export const donacionService = {
  create: (data: DonacionRequest): Promise<DonacionResponse> =>
    httpClient.postFormData<DonacionResponse>('/api/v1/donations', buildDonacionFormData(data)),

  listMine: (): Promise<DonacionesMineResponse> =>
    httpClient.get<DonacionesMineResponse>('/api/v1/donations/mine'),

  listAll: (): Promise<DonacionesAllResponse> =>
    httpClient.get<DonacionesAllResponse>('/api/v1/donations'),
};
