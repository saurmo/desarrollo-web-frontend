import { LoginRequest } from '@/src/domain/models/auth/LoginRequest';
import { LoginResponse } from '@/src/domain/models/auth/LoginResponse';
import { RegisterRequest } from '@/src/domain/models/auth/RegisterRequest';
import { RegisterResponse } from '@/src/domain/models/auth/RegisterResponse';
import { httpClient } from '../http/httpClient';

export const authService = {
  login: (credentials: LoginRequest): Promise<LoginResponse> =>
    httpClient.post<LoginResponse>('/api/v1/auth/login', credentials),

  register: (data: RegisterRequest): Promise<RegisterResponse> =>
    httpClient.post<RegisterResponse>('/api/v1/auth/register', data),
};
