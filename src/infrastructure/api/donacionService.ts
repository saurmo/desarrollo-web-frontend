import { DonacionRequest } from '@/src/domain/models/donacion/DonacionRequest';
import { DonacionResponse } from '@/src/domain/models/donacion/DonacionResponse';
import { httpClient } from '../http/httpClient';

function buildDonacionFormData(data: DonacionRequest): FormData {
  const form = new FormData();
  form.append('total', String(data.total));
  if (data.descripcion !== undefined && data.descripcion !== '') {
    form.append('descripcion', data.descripcion);
  }
  if (data.user_id) {
    form.append('user_id', data.user_id);
  }
  if (data.archivo) {
    form.append('comprobante', data.archivo);
  }
  return form;
}

export const donacionService = {
  create: (data: DonacionRequest): Promise<DonacionResponse> =>
    httpClient.postFormData<DonacionResponse>('/api/v1/donaciones', buildDonacionFormData(data)),
};
