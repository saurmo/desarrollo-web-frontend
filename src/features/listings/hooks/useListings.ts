"use client"

import { useEffect, useState } from "react"
import { Listing } from "../domain/Listing"
import { getAllListings } from "../services/linting.service"
import { DEFAULT_PAGINATION, ResponseList } from "../../common/ResponseList"


export const useListings = (page: number = 0) => {
    const [lintings, setListings] = useState<ResponseList<Listing>>({ pagination: DEFAULT_PAGINATION, data: [] })
    const [isLoading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isActive = true
        const getListings = async () => {
            try {
                setLoading(true)
                const data = await getAllListings({ page })
                setListings(data)
                if (isActive) {
                    setListings(data)
                    console.log('En proceso')
                }
            } catch (error: unknown) {
                setError(error as string)

            } finally {
                isActive=false
                setLoading(false)
            }
        }
        getListings()
        return ()=> { isActive=false }
    }, [page])

    return { lintings, isLoading, error }

}