import { API_BASE_URL } from "../config";
import {  getApiErrorMessage } from "./api-error";
import { tokenStorage } from "./token.storage";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";


/**
 * Hace la petición y traduce el error de red ("Failed to fetch", la API apagada o CORS)
 * en un mensaje que el usuario entienda.
 */
export const fetchFromApi = async (url: string, init?: RequestInit): Promise<Response> => {
    try {
        return await fetch(url, init)
    } catch {
        throw new Error("No se pudo conectar con el servidor. Verifica que la API esté encendida.")
    }
}


/**
 * Cliente HTTP centralizado: todas las peticiones a la API pasan por aquí.
 *
 * Se encarga de lo que se repetiría en cada servicio:
 *  - armar la URL con API_BASE_URL,
 *  - enviar el body como JSON, o como multipart/form-data si es un FormData (formularios con archivos),
 *  - agregar el token de la sesión en el header Authorization,
 *  - convertir los errores de la API en un Error con un mensaje legible,
 *  - cerrar la sesión y volver al login si la API responde 401 (token vencido).
 *
 * @param path ruta relativa a la API, por ejemplo "/categories?page=1"
 * @param errorMessage mensaje base si la API no explica el error
 */
export async function apiRequest<T>(
    path: string,
    options: { method?: HttpMethod; body?: unknown; errorMessage?: string } = {}
): Promise<T> {
    const { method = "GET", body, errorMessage = "No se pudo completar la operación." } = options;

    // Con FormData NO se pone Content-Type: el navegador lo arma solo con el "boundary"
    // que separa cada campo y cada archivo (multipart/form-data; boundary=----abc123).
    const isFormData = body instanceof FormData;
    const headers: Record<string, string> = {};
    if (body !== undefined && !isFormData) headers["Content-Type"] = "application/json";
    const token = tokenStorage.getToken();
    if (token) headers["Authorization"] = `Bearer ${token.accessToken}`;

    const response = await fetchFromApi(`${API_BASE_URL}${path}`, {
        method,
        headers,
        body: body === undefined ? undefined : isFormData ? body : JSON.stringify(body),
    });

    if (!response.ok) {
        // 401 con una sesión guardada: el token expiró o ya no sirve. Se borra la sesión y se vuelve al login.
        if (response.status === 401 && token && typeof window !== "undefined") {
            tokenStorage.clear();
            window.location.assign("/login");
        }
        throw new Error(await getApiErrorMessage(response, errorMessage));
    }
    return response.json() as Promise<T>;
}
