
interface Pagination {
    totalItems: number;
    page: number;
    limit: number;
}

export const getAllListings = async (pagination?: Pagination) => {
    try {
        const url = 'http://localhost:3001/api/listings'
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