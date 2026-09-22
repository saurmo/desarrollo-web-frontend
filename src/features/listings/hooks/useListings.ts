"use client"

import { useEffect, useState } from "react"
import { Listing } from "../domain/Listing"
import { getAllListings } from "../services/linting.service"
import { DEFAULT_PAGINATION, ResponseList } from "../../common/ResponseList"

const PAGE_SIZE = 10


export const useListings = (page: number = 0) => {
    const [lintings, setListings] = useState<ResponseList<Listing>>({ pagination: DEFAULT_PAGINATION, data: [] })
    const [isLoading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        // Evita que una respuesta lenta de una página anterior
        // sobrescriba los datos de la página actual.
        let isActive = true
        const getListings = async () => {
            try {
                setLoading(true)
                setError(null)
                const data = await getAllListings({ page, limit: PAGE_SIZE  })
                if (isActive) {
                    setListings(data)
                }
            } catch (error: unknown) {
               if (isActive) setError(error as string)

            } finally {
              if (isActive)  setLoading(false)
            }
        }
        getListings()
        return () => { isActive = false }
    }, [page])

    return { lintings, isLoading, error }

}