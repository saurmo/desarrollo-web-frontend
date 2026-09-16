
interface Pagination {
    totalItems: number;
    page: number;
    limit: number;
}

export const getAllUsers = async (pagination?: Pagination) => {

    const url = 'http://localhost:3001/api/users'
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error("Error al obtener los datos" + response,)
    }
    return response.json()

}
/// 500 total de items
//  10 limit - Cantidad de items: 500 / 10 = 50 paginas
//  0 offset : 1 - 10 => Page 1
//  1 offset : 11 20  => Page 2