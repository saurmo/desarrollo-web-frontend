'use client';
import { Alert } from "../../common/components/Alert";
import { Button } from "../../common/components/Button";
import { Modal } from "../../common/components/Modal";
import { Listing, PHOTO_RULES } from "../domain/Listing";
import { usePhotoSelection } from "../hooks/usePhotoSelection";
import { PhotoPicker } from "./PhotoPicker";

interface AddPhotosModalProps {
    listing: Listing;
    isSaving: boolean;
    apiError: string | null;
    onSubmit: (photos: File[]) => Promise<boolean>;
    onClose: () => void;
}

/** Modal para agregar fotos a una propiedad que ya existe (POST /listings/:id/photos). */
export function AddPhotosModal({ listing, isSaving, apiError, onSubmit, onClose }: AddPhotosModalProps) {
    // No se pueden elegir más de las que caben en la propiedad ni más de las que acepta una petición
    const available = Math.max(0, PHOTO_RULES.maxPerListing - listing.photos.length);
    const photos = usePhotoSelection(Math.min(PHOTO_RULES.maxPerRequest, available));

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await onSubmit(photos.files);
    };

    return (
        <Modal title={`Fotos de ${listing.name}`} isOpen onClose={onClose}>
            {apiError && (
                <div className="mb-4">
                    <Alert type="error" title="No se pudieron subir" message={apiError} />
                </div>
            )}
            {available === 0 ? (
                <Alert type="info" message={`Esta propiedad ya tiene el máximo de ${PHOTO_RULES.maxPerListing} fotos.`} />
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <p className="text-sm text-slate-500">
                        Tiene {listing.photos.length} de {PHOTO_RULES.maxPerListing} fotos.
                    </p>
                    <PhotoPicker selection={photos} disabled={isSaving} />
                    <div className="flex justify-end gap-2 pt-2">
                        <Button type="button" variant="ghost" onClick={onClose} disabled={isSaving}>Cancelar</Button>
                        <Button type="submit" isLoading={isSaving} disabled={photos.files.length === 0 || photos.isProcessing}>
                            Subir fotos
                        </Button>
                    </div>
                </form>
            )}
        </Modal>
    );
}
