"use client"

import { useEffect, useState } from "react"
import { Listing } from "../domain/Listing"
import { getAllListings } from "../services/linting.service"
import { DEFAULT_PAGINATION, ResponseList } from "../../common/ResponseList"


export const useListings = () => {
    const [lintings, setListings] = useState<ResponseList<Listing>>({ pagination: DEFAULT_PAGINATION, data: [] })
    const [isLoading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const getListings = async () => {
            try {
                setLoading(true)
                const data = await getAllListings()
                setListings(data)
            } catch (error: unknown) {
                setError(error as string)
            } finally {
                setLoading(false)
            }
        }
        getListings()
    }, [])

    return { lintings, isLoading, error}

}