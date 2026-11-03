'use client';
import { useEffect, useState } from "react";
import { SelectOption } from "../../common/components/Select";
import { categoryService } from "../../categories/services/category.service";

// La API pagina las categorías y acepta máximo 50 por página
const MAX_CATEGORIES = 50;

/**
 * Carga las categorías activas desde la API y las convierte en opciones para un <select>.
 * Reutiliza el servicio de la feature de categorías: la ruta de la API vive en un solo lugar.
 */
export function useCategoryOptions() {
    const [options, setOptions] = useState<SelectOption[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isActive = true;
        categoryService.getAll({ page: 1, limit: MAX_CATEGORIES })
            .then((response) => {
                if (isActive) setOptions(response.data.map((category) => ({ value: category.id, label: category.name })));
            })
            .catch((err: unknown) => {
                if (isActive) setError(err instanceof Error ? err.message : "No se pudieron cargar las categorías.");
            })
            .finally(() => {
                if (isActive) setLoading(false);
            });
        return () => { isActive = false };
    }, []);

    return { options, isLoading, error };
}
