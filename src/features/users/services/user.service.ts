import { ResponseList } from "../../common/ResponseList"
import { Pagination } from "../../common/ResponseList"
import { apiRequest } from "../../common/services/http"
import { User } from "../domain/User"

/**
 * Lista de usuarios. La API la protege (solo admin), por eso la petición pasa por apiRequest,
 * que agrega el token de la sesión en el header Authorization.
 */
export const getAllUsers = (pagination?: Pagination) => {
    const params = new URLSearchParams({
        limit: String(pagination?.limit ?? 10),
        page: String(pagination?.page ?? 1),
    })
    return apiRequest<ResponseList<User>>(`/users?${params}`, {
        errorMessage: "No se pudieron cargar los usuarios.",
    })
}
