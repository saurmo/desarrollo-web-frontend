"use client"

import { useEffect, useState } from "react"
import { Listing } from "../domain/Listing"
import { getAllListings } from "../services/linting.service"
import { DEFAULT_PAGINATION, ResponseList } from "../../common/ResponseList"

const PAGE_SIZE = 10


export const useListings = (page: number = 1) => {
    const [lintings, setListings] = useState<ResponseList<Listing>>({ pagination: DEFAULT_PAGINATION, data: [] })
    const [isLoading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    // Cambiar este número vuelve a ejecutar el efecto: así funciona el botón "Reintentar"
    const [reloadKey, setReloadKey] = useState(0)

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
                // Se guarda el TEXTO del error: React no puede pintar un objeto Error
                if (isActive) setError(error instanceof Error ? error.message : "Ha ocurrido un error inesperado.")

            } finally {
              if (isActive)  setLoading(false)
            }
        }
        getListings()
        return () => { isActive = false }
    }, [page, reloadKey])

    const reload = () => setReloadKey((key) => key + 1)

    return { lintings, isLoading, error, reload }

}