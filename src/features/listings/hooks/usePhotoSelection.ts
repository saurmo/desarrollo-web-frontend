'use client';
import { useEffect, useRef, useState } from "react";
import { compressImage } from "../../common/utils/compress-image";
import { PHOTO_RULES } from "../domain/Listing";

/** Imagen elegida por el usuario, ya reducida, con la URL temporal para la vista previa. */
export interface SelectedPhoto {
    file: File;
    previewUrl: string;
}

const MAX_BYTES = PHOTO_RULES.maxSizeMB * 1024 * 1024;

/**
 * Estado de las imágenes elegidas en un <input type="file">: las valida, las reduce y
 * crea su vista previa. No llama a la API: quien lo usa envía `files` cuando guarda.
 *
 * @param maxFiles cuántas imágenes se pueden elegir (por defecto, las que acepta una petición)
 */
export function usePhotoSelection(maxFiles: number = PHOTO_RULES.maxPerRequest) {
    const [photos, setPhotos] = useState<SelectedPhoto[]>([]);
    const [isProcessing, setProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // URL.createObjectURL reserva memoria hasta que se libera con revokeObjectURL.
    // El ref guarda la lista actual para liberarla al cerrar el formulario (desmontar el componente).
    const photosRef = useRef(photos);
    useEffect(() => { photosRef.current = photos; }, [photos]);
    useEffect(() => () => photosRef.current.forEach((photo) => URL.revokeObjectURL(photo.previewUrl)), []);

    /** Recibe los archivos del input (onChange) y agrega los que cumplen las reglas. */
    const addFiles = async (fileList: FileList | null) => {
        if (!fileList || fileList.length === 0) return;
        setError(null);

        const available = maxFiles - photos.length;
        const files = Array.from(fileList);
        if (files.length > available) {
            setError(`Puedes elegir máximo ${maxFiles} imágenes.`);
            return;
        }
        const invalid = files.find((file) => !PHOTO_RULES.acceptedTypes.includes(file.type));
        if (invalid) {
            setError(`${invalid.name}: solo se aceptan imágenes JPG, PNG o WEBP.`);
            return;
        }

        setProcessing(true);
        try {
            const compressed = await Promise.all(files.map((file) => compressImage(file, MAX_BYTES)));
            const tooBig = compressed.find((file) => file.size > MAX_BYTES);
            if (tooBig) {
                setError(`${tooBig.name} sigue pesando más de ${PHOTO_RULES.maxSizeMB} MB después de reducirla.`);
                return;
            }
            const newPhotos = compressed.map((file) => ({ file, previewUrl: URL.createObjectURL(file) }));
            setPhotos((prev) => [...prev, ...newPhotos]);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "No se pudieron procesar las imágenes.");
        } finally {
            setProcessing(false);
        }
    };

    const removePhoto = (index: number) => {
        URL.revokeObjectURL(photos[index].previewUrl);
        setPhotos((prev) => prev.filter((_, i) => i !== index));
    };

    return {
        photos,
        files: photos.map((photo) => photo.file),
        isProcessing,
        error,
        canAddMore: photos.length < maxFiles,
        maxFiles,
        addFiles,
        removePhoto,
    };
}
