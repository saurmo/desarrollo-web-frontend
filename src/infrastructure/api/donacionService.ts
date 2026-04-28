import { DonacionRequest } from '@/src/domain/models/donacion/DonacionRequest';
import { DonacionResponse } from '@/src/domain/models/donacion/DonacionResponse';
import { httpClient } from '../http/httpClient';

export const donacionService = {
  create: (data: DonacionRequest): Promise<DonacionResponse> =>
    httpClient.post<DonacionResponse>('/api/v1/donaciones', data),
};
