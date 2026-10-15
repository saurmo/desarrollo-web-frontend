import { API_BASE_URL } from "../../common/config";
import { RegisterPayload, RegisterResponse } from "../domain/register";

/** Forma del cuerpo de error que puede devolver el backend. */
interface BackendError {
  message?: string;
  error?: string;
  /** Errores de class-validator: un objeto por campo, por ejemplo [{ isEmail: "email must be an email" }]. */
  errors?: Record<string, string>[];
}

/**
 * Convierte la respuesta de error del backend en un solo texto para mostrar al usuario.
 *
 * El endpoint de registro responde 400 con { message, errors: [...] }.
 * Esta función toma el mensaje general y le agrega el detalle de cada campo inválido.
 */
const parseBackendError = (body: BackendError): string => {
  // flatMap recorre cada objeto de errores y junta todos sus mensajes en un solo arreglo
  const details = (body.errors ?? []).flatMap((constraints) => Object.values(constraints ?? {}));
  const title = body.message ?? body.error ?? 'No fue posible completar el registro.';
  return details.length ? `${title}: ${details.join(', ')}` : title;
};

/**
 * Servicio de registro: la ÚNICA parte de la feature que sabe que existe una API HTTP.
 * Los hooks y componentes no llaman a fetch directamente; usan este servicio.
 */
export const registerService = {
  /**
   * Envía los datos del nuevo usuario al backend.
   * Si todo sale bien, retorna { name }. Si falla, lanza un Error con un mensaje legible.
   */
  async register(payload: RegisterPayload): Promise<RegisterResponse> {
    const url = `${API_BASE_URL}/auth/register`
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(payload)
    })

    // response.ok es true solo para los códigos 2xx
    if (!response.ok) {
      // En un 5xx no mostramos el detalle técnico al usuario
      if (response.status >= 500) {
        throw new Error(`Error al conectarse con el servidor.`)
      }
      const error: BackendError = await response.json()
      throw new Error(parseBackendError(error))
    }

    // El backend envuelve la respuesta en { data }; aquí solo devolvemos lo de adentro
    const { data } = await response.json()
    return data;
  }
};
