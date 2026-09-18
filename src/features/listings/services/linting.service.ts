import { Pagination } from "../../common/ResponseList";
import { API_BASE_URL } from "../../common/config";



export const getAllListings = async (pagination?: Pagination) => {
    try {
        const url = `${API_BASE_URL}/listings?limit=${pagination?.limit ?? 10}&page=${pagination?.page ?? 0}`
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error("Error al obtener los datos" + response,)
        }
        return response.json()
    } catch (error: unknown) {
        console.error(error)
        throw new Error("Ha ocurrido un error inesperado.")
    }
}
/// 500 total de items
//  10 limit - Cantidad de items: 500 / 10 = 50 paginas
//  0 offset : 1 - 10 => Page 1
//  1 offset : 11 20  => Page 2