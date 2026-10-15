import { UserRole } from "../../users/domain/User";

/**
 * Roles que puede elegir una persona al registrarse.
 * Se toman del UserRole general, pero sin 'admin': nadie debe poder registrarse como administrador.
 */
export type RegisterRole = Extract<UserRole, 'user' | 'owner'>;

/** Datos que el formulario envía a POST /api/auth/register. Los nombres coinciden con los del backend. */
export interface RegisterPayload {
  name: string;
  identification: string;
  role: RegisterRole;
  phone: string;
  email: string;
  password: string;
}

/** Lo que responde el backend cuando el registro sale bien: { data: { name } }. */
export interface RegisterResponse {
  name: string;
}

/** Estado de la petición de registro que maneja el hook useRegister. */
export interface RegisterState {
  /** true mientras se espera la respuesta del backend. */
  isLoading: boolean;
  /** Mensaje de error del backend, o null si no hay error. */
  error: string | null;
  /** Nombre del usuario recién registrado; sirve para mostrar el mensaje de éxito. */
  registeredName: string | null;
}

/**
 * Errores de validación del formulario: un mensaje opcional por cada campo.
 * Partial + Record construye { name?: string; email?: string; ... } a partir de RegisterPayload,
 * así si se agrega un campo nuevo al payload, este tipo se actualiza solo.
 */
export type RegisterValidationErrors = Partial<Record<keyof RegisterPayload, string>>;
