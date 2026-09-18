import { useEffect, useState } from "react"
import { User } from "../domain/User"
import { getAllUsers } from "../services/user.service"
import { DEFAULT_PAGINATION, ResponseList } from "../../common/ResponseList"

export const useUsers = () => {
    const [users, setUsers] = useState<ResponseList<User>>({ pagination: DEFAULT_PAGINATION, data: [] })
    const [isLoading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const getUsers = async () => {
            try {
                setLoading(true)
                const data = await getAllUsers({
                    page: 2,
                    limit: 10
                })
                setUsers(data)
            } catch (error: unknown) {
                setError(error as string)
            } finally {
                setLoading(false)
            }
        }
        getUsers()
    }, [])

    return { users, isLoading, error }

}