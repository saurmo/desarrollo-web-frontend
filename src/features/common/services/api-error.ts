
/**
 * Convierte una respuesta fallida de la API en un mensaje para mostrar al usuario.
 *
 * La API responde los errores como { error: "mensaje" }. Si el cuerpo no trae ese
 * formato (por ejemplo, un 500 con HTML), se usa un mensaje genérico con el código HTTP.
 */
export const getApiErrorMessage = async (response: Response, fallback: string): Promise<string> => {
    if (response.status >= 500) {
        return `${fallback} El servidor tuvo un problema (HTTP ${response.status}).`
    }
    try {
        const body = await response.json()
        if (typeof body?.error === "string") return body.error
        // Errores de validación (400): { message, errors: [{ isNotEmpty: "name es obligatorio" }, ...] }
        if (Array.isArray(body?.errors)) {
            const details = body.errors.flatMap((field: Record<string, string>) => Object.values(field ?? {}))
            if (details.length) return details.join(". ")
        }
        if (typeof body?.message === "string") return body.message
    } catch {
        // El cuerpo no era JSON: se usa el mensaje genérico
    }
    return `${fallback} (HTTP ${response.status})`
}

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
