import { tokenStorage } from '../storage/tokenStorage';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

function getHeaders(): HeadersInit {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const token = tokenStorage.get();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

function getAuthHeadersOnly(): HeadersInit {
  const headers: Record<string, string> = {};
  const token = tokenStorage.get();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

async function parseErrorMessage(response: Response): Promise<string> {
  let message = `Error ${response.status}: ${response.statusText}`;
  try {
    const body = (await response.json()) as { message?: string };
    if (body?.message && typeof body.message === 'string') {
      message = body.message;
    }
  } catch {
    message = 'Error al procesar la respuesta del servidor';
  }
  return message;
}

async function request<T>(path: string, options: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: getHeaders(),
  });
  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }
  return response.json() as Promise<T>;
}

export const httpClient = {
  get: <T>(path: string): Promise<T> =>
    request<T>(path, { method: 'GET' }),

  post: <T>(path: string, body: unknown): Promise<T> =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),

  /** POST multipart (no fija Content-Type; el navegador añade el boundary). */
  postFormData: async <T>(path: string, formData: FormData): Promise<T> => {
    const response = await fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      headers: getAuthHeadersOnly(),
      body: formData,
    });
    if (!response.ok) {
      throw new Error(await parseErrorMessage(response));
    }
    return response.json() as Promise<T>;
  },

  put: <T>(path: string, body: unknown): Promise<T> =>
    request<T>(path, { method: 'PUT', body: JSON.stringify(body) }),

  delete: <T>(path: string): Promise<T> =>
    request<T>(path, { method: 'DELETE' }),
};
