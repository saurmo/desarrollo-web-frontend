/**
 * Reduce una imagen en el navegador antes de enviarla a la API.
 *
 * Una foto de celular pesa 3–5 MB y mide 4000 px; para una tarjeta web basta con 1600 px y
 * unos 200–400 KB. Reducirla aquí hace la subida más rápida, cabe en el límite de Vercel
 * (4.5 MB por petición) y, de paso, elimina los metadatos EXIF (incluida la ubicación GPS),
 * porque el canvas solo copia los píxeles.
 *
 * @param file imagen original elegida en el <input type="file">
 * @param maxBytes peso máximo deseado; se baja la calidad hasta cumplirlo
 * @param maxDimension ancho o alto máximo en píxeles
 */
export async function compressImage(file: File, maxBytes: number, maxDimension = 1600): Promise<File> {
    // createImageBitmap respeta la orientación EXIF: la foto no queda girada
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();

    // WEBP pesa menos que JPG con la misma calidad; los navegadores que no lo generan devuelven PNG
    const type = canvas.toDataURL("image/webp").startsWith("data:image/webp") ? "image/webp" : "image/jpeg";
    const extension = type === "image/webp" ? "webp" : "jpg";
    const baseName = file.name.replace(/\.[^.]+$/, "");

    let blob: Blob | null = null;
    for (const quality of [0.82, 0.7, 0.55, 0.4]) {
        blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, quality));
        if (blob && blob.size <= maxBytes) break;
    }
    if (!blob) throw new Error(`No se pudo procesar la imagen ${file.name}.`);

    return new File([blob], `${baseName}.${extension}`, { type });
}
