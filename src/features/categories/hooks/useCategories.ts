'use client';
import { useEffect, useState } from "react";
import { DEFAULT_PAGINATION, ResponseList } from "../../common/ResponseList";
import { Category } from "../domain/Category";
import { categoryService } from "../services/category.service";

export const PAGE_SIZE = 10;

/**
 * Carga la lista de categorías de una página, con filtro opcional por nombre.
 * Expone reload() para volver a pedir los datos después de crear, editar o eliminar.
 */
export function useCategories(page: number, name: string) {
    const [categories, setCategories] = useState<ResponseList<Category>>({ pagination: DEFAULT_PAGINATION, data: [] });
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    // Cambiar este número vuelve a ejecutar el efecto
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        // Evita que una respuesta lenta de una búsqueda anterior sobrescriba la actual
        let isActive = true;
        const load = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await categoryService.getAll({ page, limit: PAGE_SIZE, name });
                if (isActive) setCategories(data);
            } catch (err: unknown) {
                if (isActive) setError(err instanceof Error ? err.message : "Ha ocurrido un error inesperado.");
            } finally {
                if (isActive) setLoading(false);
            }
        };
        load();
        return () => { isActive = false };
    }, [page, name, reloadKey]);

    const reload = () => setReloadKey((key) => key + 1);

    return { categories, isLoading, error, reload };
}
