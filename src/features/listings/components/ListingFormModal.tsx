'use client';
import { Alert } from "../../common/components/Alert";
import { Button } from "../../common/components/Button";
import { Input } from "../../common/components/Input";
import { Modal } from "../../common/components/Modal";
import { Select } from "../../common/components/Select";
import { ListingFormValues } from "../domain/Listing";
import { useCategoryOptions } from "../hooks/useCategoryOptions";
import { useListingForm } from "../hooks/useListingForm";
import { usePhotoSelection } from "../hooks/usePhotoSelection";
import { PhotoPicker } from "./PhotoPicker";

interface ListingFormModalProps {
    isSaving: boolean;
    /** Error que devolvió la API al guardar (por ejemplo, una imagen rechazada o el 429 del rate limit). */
    apiError: string | null;
    onSubmit: (values: ListingFormValues, photos: File[]) => Promise<boolean>;
    onClose: () => void;
}

/** Modal para crear una propiedad con sus fotos en una sola petición. */
export function ListingFormModal({ isSaving, apiError, onSubmit, onClose }: ListingFormModalProps) {
    const photos = usePhotoSelection();
    const categories = useCategoryOptions();
    const form = useListingForm((values) => onSubmit(values, photos.files));

    return (
        <Modal title="Nueva propiedad" isOpen onClose={onClose}>
            {apiError && (
                <div className="mb-4">
                    <Alert type="error" title="No se pudo guardar" message={apiError} />
                </div>
            )}

            <form onSubmit={form.handleSubmit} className="space-y-4" noValidate>
                <Input label="Nombre" name="name" placeholder="Ej. Cabaña en Guatapé" value={form.values.name}
                    onChange={form.handleChange} error={form.errors.name} maxLength={255} autoFocus />
                <Input label="Ubicación" name="location" placeholder="Ej. Guatapé, Antioquia" value={form.values.location}
                    onChange={form.handleChange} error={form.errors.location} maxLength={255} />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <Input label="Precio / noche" name="price" type="number" min={0} step="any" placeholder="250000"
                        value={form.values.price} onChange={form.handleChange} error={form.errors.price} />
                    <Input label="Capacidad" name="capacity" type="number" min={1} step={1} placeholder="4"
                        value={form.values.capacity} onChange={form.handleChange} error={form.errors.capacity} />
                    <Input label="Clima" name="weather" placeholder="Templado" value={form.values.weather}
                        onChange={form.handleChange} error={form.errors.weather} maxLength={100} />
                </div>

                <Select
                    label="Categoría"
                    name="categoryId"
                    value={form.values.categoryId}
                    onChange={form.handleChange}
                    options={categories.options}
                    placeholder={categories.isLoading ? "Cargando categorías..." : "Sin categoría"}
                    disabled={categories.isLoading || isSaving}
                    error={categories.error ?? undefined}
                />

                <PhotoPicker selection={photos} disabled={isSaving} />

                <div className="flex justify-end gap-2 pt-2">
                    <Button type="button" variant="ghost" onClick={onClose} disabled={isSaving}>Cancelar</Button>
                    {/* Deshabilitado mientras se reducen las fotos: si no, se enviaría sin ellas */}
                    <Button type="submit" isLoading={isSaving} disabled={photos.isProcessing}>Crear propiedad</Button>
                </div>
            </form>
        </Modal>
    );
}
