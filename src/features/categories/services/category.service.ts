import { ResponseList } from "../../common/ResponseList";
import { apiRequest } from "../../common/services/http";
import { Category, CategoryInput } from "../domain/Category";

/**
 * Servicio de categorías: la única parte de la feature que conoce las rutas de la API.
 * Todas las peticiones pasan por apiRequest, que agrega el token y traduce los errores.
 */
export const categoryService = {
    /** GET /categories con paginación y filtro opcional por nombre. */
    getAll(params: { page: number; limit: number; name?: string }) {
        const query = new URLSearchParams({ page: String(params.page), limit: String(params.limit) });
        if (params.name) query.set("name", params.name);
        return apiRequest<ResponseList<Category>>(`/categories?${query}`, {
            errorMessage: "No se pudieron cargar las categorías.",
        });
    },

    /** POST /categories */
    create(input: CategoryInput) {
        return apiRequest<{ data: Category }>("/categories", {
            method: "POST", body: input, errorMessage: "No se pudo crear la categoría.",
        });
    },

    /** PUT /categories/:id */
    update(id: string, input: CategoryInput) {
        return apiRequest<{ data: Category }>(`/categories/${id}`, {
            method: "PUT", body: input, errorMessage: "No se pudo actualizar la categoría.",
        });
    },

    /** DELETE /categories/:id — en el backend es un borrado lógico (state = REMOVED). */
    remove(id: string) {
        return apiRequest<{ message: string }>(`/categories/${id}`, {
            method: "DELETE", errorMessage: "No se pudo eliminar la categoría.",
        });
    },
};
