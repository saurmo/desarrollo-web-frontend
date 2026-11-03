import { cache } from "react";
import { API_BASE_URL } from "../../common/config";
import { ResponseList } from "../../common/ResponseList";
import { Listing } from "../domain/Listing";

/**
 * Peticiones que se hacen EN EL SERVIDOR de Next (Server Components, generateMetadata, sitemap).
 * No usan apiRequest porque ahí no hay token ni localStorage: son datos públicos.
 *
 * revalidate: Next guarda la respuesta 60 segundos. Las visitas (y Google) reciben la página
 * ya armada sin llamar a la API cada vez; un cambio en la propiedad se ve a más tardar en un minuto.
 */
const REVALIDATE_SECONDS = 60;

/**
 * cache() de React: generateMetadata y la página piden la misma propiedad,
 * pero la petición a la API se hace una sola vez por visita.
 * Devuelve null si la propiedad no existe o fue eliminada (la API responde 404).
 */
export const getListingById = cache(async (id: string): Promise<Listing | null> => {
    const response = await fetch(`${API_BASE_URL}/listings/${encodeURIComponent(id)}`, {
        next: { revalidate: REVALIDATE_SECONDS },
    });
    if (response.status === 404) return null;
    if (!response.ok) throw new Error(`La API respondió ${response.status} al pedir la propiedad ${id}`);
    const body = await response.json() as { data: Listing };
    return body.data;
});

/** Una página de propiedades activas (la API acepta máximo 50 por página). */
export const getListingsPage = async (page: number, limit = 50): Promise<ResponseList<Listing>> => {
    const response = await fetch(`${API_BASE_URL}/listings?page=${page}&limit=${limit}`, {
        next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!response.ok) throw new Error(`La API respondió ${response.status} al listar propiedades`);
    return response.json();
};
