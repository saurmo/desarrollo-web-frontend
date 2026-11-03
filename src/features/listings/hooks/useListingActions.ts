'use client';
import { useState } from "react";
import { ListingFormValues } from "../domain/Listing";
import { listingService } from "../services/linting.service";

/**
 * Operaciones que modifican propiedades: crear (con imágenes), agregar fotos y eliminar.
 * Guarda el estado de la operación en curso (isSaving) y el error que devuelva la API.
 */
export function useListingActions() {
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
        create: (values: ListingFormValues, photos: File[]) => run(() => listingService.create(values, photos)),
        addPhotos: (id: string, photos: File[]) => run(() => listingService.addPhotos(id, photos)),
        remove: (id: string) => run(() => listingService.remove(id)),
    };
}
