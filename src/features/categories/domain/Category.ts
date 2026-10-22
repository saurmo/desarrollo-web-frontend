/** Categoría tal como la devuelve la API. */
export interface Category {
    id: string;
    name: string;
    description: string | null;
    state: "ACTIVE" | "REMOVED";
    createdAt: string | null;
    updatedAt: string | null;
    createdBy: string;
    updatedBy: string | null;
}

/** Datos que se envían al crear o editar: solo lo que el usuario escribe en el formulario. */
export interface CategoryInput {
    name: string;
    description: string;
}

export type CategoryFormErrors = Partial<Record<keyof CategoryInput, string>>;
