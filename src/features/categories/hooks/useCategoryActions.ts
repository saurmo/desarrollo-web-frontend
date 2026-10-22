'use client';
import { useState } from "react";
import { CategoryInput } from "../domain/Category";
import { categoryService } from "../services/category.service";

/**
 * Operaciones que modifican categorías: crear, editar y eliminar.
 * Guarda el estado de la operación en curso (isSaving) y el error que devuelva la API.
 */
export function useCategoryActions() {
    const [isSaving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /** Ejecuta una operación y retorna true si salió bien; si falla, guarda el mensaje de error. */
    const run = async (operation: () => Promise<unknown>): Promise<boolean> => {
        setSaving(true);
        setError(null);
        try {
            await operation();
            return true;
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Ha ocurrido un error inesperado.");
            return false;
        } finally {
            setSaving(false);
        }
    };

    return {
        isSaving,
        error,
        clearError: () => setError(null),
        create: (input: CategoryInput) => run(() => categoryService.create(input)),
        update: (id: string, input: CategoryInput) => run(() => categoryService.update(id, input)),
        remove: (id: string) => run(() => categoryService.remove(id)),
    };
}
