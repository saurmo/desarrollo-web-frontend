import { useEffect, useState } from "react"
import { User } from "../domain/User"
import { getAllUsers } from "../services/user.service"
import { DEFAULT_PAGINATION, ResponseList } from "../../common/ResponseList"

const PAGE_SIZE = 10

export const useUsers = (page: number = 1) => {
    const [users, setUsers] = useState<ResponseList<User>>({ pagination: DEFAULT_PAGINATION, data: [] })
    const [isLoading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        // Evita que una respuesta lenta de una página anterior
        // sobrescriba los datos de la página actual.
        let isActive = true

        const getUsers = async () => {
            try {
                setLoading(true)
                setError(null)
                const data = await getAllUsers({
                    page,
                    limit: PAGE_SIZE
                })
                if (isActive) setUsers(data)
            } catch (error: unknown) {
                if (isActive) setError(error instanceof Error ? error.message : "Ha ocurrido un error inesperado.")
            } finally {
                if (isActive) setLoading(false)
            }
        }
        getUsers()

        return () => { isActive = false }
    }, [page])

    return { users, isLoading, error }

}
