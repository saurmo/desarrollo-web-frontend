// Interfaz para definir los tipos de datos de la cabaña
export interface Listing {
  id: string;
  name: string;
  location: string;
  price: number;
  capacity: number;
  comodities: string[];
  weather: string;
  rating: number;
  photos: string[];
  videos?: string[];
  categories: string[];
  /** Id del usuario que creó la propiedad: un owner solo puede modificar las suyas. */
  createdBy?: string;
  createdAt?: string | null;
}

/**
 * Valores del formulario de crear propiedad.
 * Son texto porque así los entrega un <input>; la API convierte price y capacity a número.
 */
export interface ListingFormValues {
  name: string;
  location: string;
  price: string;
  capacity: string;
  weather: string;
}

export type ListingFormErrors = Partial<Record<keyof ListingFormValues, string>>;

/** Mismas reglas de imágenes que el backend (upload.middleware.ts y listings.use-case.ts). */
export const PHOTO_RULES = {
  acceptedTypes: ["image/jpeg", "image/png", "image/webp"],
  /** Peso máximo de cada imagen DESPUÉS de reducirla en el navegador. */
  maxSizeMB: 1,
  maxPerRequest: 4,
  maxPerListing: 10,
};

/**
 * Devuelve la URL solo si es absoluta (http/https). next/image lanza un error con valores como
 * "photo1.jpg", que existen en datos viejos de la base.
 */
export const getPhotoUrl = (url: string | undefined): string | null =>
  url && /^https?:\/\//.test(url) ? url : null;
