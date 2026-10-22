'use client';
import { useState } from "react";
import { Category, CategoryFormErrors, CategoryInput } from "../domain/Category";

/** Convierte una categoría existente en los valores iniciales del formulario (o vacíos si es nueva). */
const toFormValues = (category?: Category | null): CategoryInput => ({
    name: category?.name ?? "",
    description: category?.description ?? "",
});

/** Mismas reglas que el DTO del backend, para avisar antes de enviar. */
const validateField = (field: keyof CategoryInput, value: string): string | undefined => {
    if (field === "name") {
        if (!value.trim()) return "El nombre es obligatorio.";
        if (value.trim().length < 2) return "El nombre debe tener al menos 2 caracteres.";
        if (value.trim().length > 100) return "El nombre no puede tener más de 100 caracteres.";
    }
    if (field === "description" && value.length > 500) {
        return "La descripción no puede tener más de 500 caracteres.";
    }
    return undefined;
};

/**
 * Estado del formulario del modal de categoría: valores, errores por campo y envío.
 * No llama a la API: cuando los datos son válidos, los entrega a onSubmit.
 *
 * @param category la categoría a editar, o null para crear una nueva
 * @param onSubmit función que guarda; retorna true si salió bien
 */
export function useCategoryForm(category: Category | null, onSubmit: (input: CategoryInput) => Promise<boolean>) {
    const [values, setValues] = useState<CategoryInput>(() => toFormValues(category));
    const [errors, setErrors] = useState<CategoryFormErrors>({});

    /** Actualiza el campo que cambió y lo valida al instante. Sirve para input y textarea. */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const field = event.target.name as keyof CategoryInput;
        const value = event.target.value;
        setValues((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
    };

    /** Valida todos los campos y, si están bien, envía los datos sin espacios sobrantes. */
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const newErrors: CategoryFormErrors = {
            name: validateField("name", values.name),
            description: validateField("description", values.description),
        };
        setErrors(newErrors);
        if (newErrors.name || newErrors.description) return;
        await onSubmit({ name: values.name.trim(), description: values.description.trim() });
    };

    return { values, errors, handleChange, handleSubmit };
}
