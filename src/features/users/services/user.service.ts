import { API_BASE_URL } from "../../common/config"
import { Pagination } from "../../common/ResponseList"

export const getAllUsers = async (pagination?: Pagination) => {
    const url = `${API_BASE_URL}/users?limit=${pagination?.limit ?? 10}&page=${pagination?.page ?? 0}`
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error("Error al obtener los datos" + response,)
    }
    return response.json()
}
