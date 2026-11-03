'use client';
import { ImagePlus, RefreshCw, X } from "lucide-react";
import { PHOTO_RULES } from "../domain/Listing";
import { usePhotoSelection } from "../hooks/usePhotoSelection";

interface PhotoPickerProps {
    /** Lo que devuelve usePhotoSelection: el padre guarda el estado y lo usa al enviar. */
    selection: ReturnType<typeof usePhotoSelection>;
    disabled?: boolean;
}

/**
 * Selector de imágenes con vista previa.
 * El <input type="file"> va oculto dentro del <label>: al hacer clic en la caja se abre el explorador de archivos.
 */
export function PhotoPicker({ selection, disabled }: PhotoPickerProps) {
    const { photos, isProcessing, error, canAddMore, maxFiles, addFiles, removePhoto } = selection;

    return (
        <div className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-950">
                Fotos <span className="font-normal normal-case text-slate-400">({photos.length}/{maxFiles})</span>
            </span>

            <div className="grid grid-cols-4 gap-2">
                {photos.map((photo, index) => (
                    <div key={photo.previewUrl} className="relative aspect-square overflow-hidden rounded-xl border border-emerald-100">
                        {/* <img> y no next/image: la vista previa es una URL blob: local que Next no puede optimizar */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={photo.previewUrl} alt={`Vista previa ${index + 1}`} className="h-full w-full object-cover" />
                        <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            disabled={disabled}
                            aria-label={`Quitar foto ${index + 1}`}
                            className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white hover:bg-black/80"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </div>
                ))}

                {canAddMore && (
                    <label className={`flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-emerald-200 text-emerald-700 hover:border-emerald-400 hover:bg-emerald-50 ${disabled || isProcessing ? "pointer-events-none opacity-60" : ""}`}>
                        {isProcessing ? <RefreshCw className="h-5 w-5 animate-spin" /> : <ImagePlus className="h-5 w-5" />}
                        <span className="text-[11px] font-medium">{isProcessing ? "Preparando..." : "Agregar"}</span>
                        <input
                            type="file"
                            accept={PHOTO_RULES.acceptedTypes.join(",")}
                            multiple
                            className="sr-only"
                            disabled={disabled || isProcessing}
                            onChange={(event) => {
                                addFiles(event.target.files);
                                // Se limpia el input para que elegir otra vez el mismo archivo vuelva a disparar onChange
                                event.target.value = "";
                            }}
                        />
                    </label>
                )}
            </div>

            <p className="text-xs text-slate-400">
                JPG, PNG o WEBP. Se reducen automáticamente antes de subirlas.
            </p>
            {error && <p role="alert" className="text-xs font-medium text-red-600">{error}</p>}
        </div>
    );
}
