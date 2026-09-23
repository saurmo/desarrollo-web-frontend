import { useEffect, useState } from "react"
import { User } from "../domain/User"
import { getAllUsers } from "../services/user.service"
import { DEFAULT_PAGINATION, ResponseList } from "../../common/ResponseList"

const DEFAULT_LIMIT = 10

export const useUsers = (page: number=1) => {
    const [users, setUsers] = useState<ResponseList<User>>({ pagination: DEFAULT_PAGINATION, data: [] })
    const [isLoading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isActive = true
        const getUsers = async () => {
            try {
                setLoading(true)
                setError(null)
                const data = await getAllUsers({
                    page,
                    limit: DEFAULT_LIMIT
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
