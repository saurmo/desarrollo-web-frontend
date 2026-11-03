import { Pagination, ResponseList } from "../../common/ResponseList";
import { apiRequest } from "../../common/services/http";
import { Listing, ListingFormValues } from "../domain/Listing";


export const getAllListings = async (pagination?: Pagination) => {
    const query = new URLSearchParams({
        limit: String(pagination?.limit ?? 10),
        page: String(pagination?.page ?? 1),
    })
      return apiRequest<ResponseList<Listing>>(`/listings?${query}`, {
            errorMessage: "No se pudieron cargar las propiedades.",
        });


}

/** Arma el FormData: cada campo de texto con append(nombre, valor) y cada imagen en el campo "photos". */
const toFormData = (photos: File[], values?: ListingFormValues): FormData => {
    const form = new FormData();
    if (values) {
        Object.entries(values).forEach(([field, value]) => form.append(field, value.trim()));
    }
    // El mismo nombre varias veces: la API recibe un arreglo de archivos en "photos"
    photos.forEach((photo) => form.append("photos", photo));
    return form;
};

/**
 * Servicio de propiedades. Crear y agregar fotos se envían como multipart/form-data,
 * el formato que permite mandar archivos junto con los campos de texto.
 */
export const listingService = {
    getAll: getAllListings,

    /** POST /listings con los datos y las imágenes en una sola petición. */
    create(values: ListingFormValues, photos: File[]) {
        return apiRequest<{ data: Listing }>("/listings", {
            method: "POST", body: toFormData(photos, values), errorMessage: "No se pudo crear la propiedad.",
        });
    },

    /** POST /listings/:id/photos: agrega imágenes a una propiedad existente. */
    addPhotos(id: string, photos: File[]) {
        return apiRequest<{ data: Listing }>(`/listings/${id}/photos`, {
            method: "POST", body: toFormData(photos), errorMessage: "No se pudieron subir las fotos.",
        });
    },

    /** DELETE /listings/:id — en el backend es un borrado lógico (state = REMOVED). */
    remove(id: string) {
        return apiRequest<{ message: string }>(`/listings/${id}`, {
            method: "DELETE", errorMessage: "No se pudo eliminar la propiedad.",
        });
    },
};
