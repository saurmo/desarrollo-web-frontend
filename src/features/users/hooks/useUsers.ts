import { useEffect, useState } from "react"
import { User } from "../domain/User"
import { getAllUsers } from "../services/user.service"

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([])
    const [isLoading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const getUsers = async () => {
            try {
                setLoading(true)
                const data = await getAllUsers()
                setUsers(data)
            } catch (error: unknown) {
                setError(error as string)
            } finally {
                setLoading(false)
            }
        }
        getUsers()
    }, [])

    return { users, isLoading, error}

}