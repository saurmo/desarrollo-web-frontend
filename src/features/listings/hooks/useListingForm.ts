'use client';
import { useState } from "react";
import { ListingFormErrors, ListingFormValues } from "../domain/Listing";

const EMPTY_VALUES: ListingFormValues = { name: "", location: "", price: "", capacity: "", weather: "" };

/** Mismas reglas que ListingDto en el backend, para avisar antes de enviar. */
const validateField = (field: keyof ListingFormValues, value: string): string | undefined => {
    const text = value.trim();
    switch (field) {
        case "name":
        case "location":
            if (!text) return "Este campo es obligatorio.";
            if (text.length > 255) return "Máximo 255 caracteres.";
            return undefined;
        case "weather":
            if (!text) return "El clima es obligatorio.";
            if (text.length > 100) return "Máximo 100 caracteres.";
            return undefined;
        case "price":
            if (!text) return "El precio es obligatorio.";
            if (Number.isNaN(Number(text)) || Number(text) < 0) return "Escribe un precio válido (0 o más).";
            return undefined;
        case "capacity":
            if (!text) return "La capacidad es obligatoria.";
            if (!Number.isInteger(Number(text)) || Number(text) < 1) return "Escribe un número entero desde 1.";
            return undefined;
    }
};

/**
 * Estado del formulario de propiedad: valores, errores por campo y envío.
 * Las imágenes van aparte (usePhotoSelection); este hook solo maneja los campos de texto.
 *
 * @param onSubmit función que guarda; retorna true si salió bien
 */
export function useListingForm(onSubmit: (values: ListingFormValues) => Promise<boolean>) {
    const [values, setValues] = useState<ListingFormValues>(EMPTY_VALUES);
    const [errors, setErrors] = useState<ListingFormErrors>({});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const field = event.target.name as keyof ListingFormValues;
        const value = event.target.value;
        setValues((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const fields = Object.keys(EMPTY_VALUES) as (keyof ListingFormValues)[];
        const newErrors: ListingFormErrors = Object.fromEntries(
            fields.map((field) => [field, validateField(field, values[field])])
        );
        setErrors(newErrors);
        if (fields.some((field) => newErrors[field])) return;
        await onSubmit(values);
    };

    return { values, errors, handleChange, handleSubmit };
}
