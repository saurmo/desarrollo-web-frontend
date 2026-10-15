'use client';
import { useState } from "react";
import { RegisterPayload, RegisterValidationErrors } from "../domain/register";

/** Valores con los que arranca el formulario (y a los que vuelve después de un registro exitoso). */
const INITIAL_VALUES: RegisterPayload = {
    name: '',
    identification: '',
    role: 'user',
    phone: '',
    email: '',
    password: ''
};

/** Lista de los nombres de los campos, para poder recorrerlos todos al validar. */
const FIELDS = Object.keys(INITIAL_VALUES) as (keyof RegisterPayload)[];

/**
 * Valida UN campo y retorna el mensaje de error, o undefined si el valor es válido.
 * Está fuera del hook porque no usa estado: es una función pura (mismo valor → mismo resultado).
 */
const validateField = (field: keyof RegisterPayload, value: string): string | undefined => {
    switch (field) {
        case 'name':
            if (!value.trim()) return 'El nombre es requerido.';
            if (value.trim().length < 3) return 'El nombre debe tener al menos 3 caracteres.';
            break;
        case 'identification':
            if (!value.trim()) return 'La identificación es requerida.';
            if (!/^\d{5,15}$/.test(value)) return 'La identificación debe tener entre 5 y 15 dígitos.';
            break;
        case 'role':
            if (value !== 'user' && value !== 'owner') return 'Selecciona un rol válido.';
            break;
        case 'phone':
            if (!value.trim()) return 'El teléfono es requerido.';
            if (!/^\d{7,10}$/.test(value)) return 'El teléfono debe tener entre 7 y 10 dígitos.';
            break;
        case 'email':
            if (!value.trim()) return 'El correo electrónico es requerido.';
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Ingresa un formato de correo válido.';
            break;
        case 'password':
            // Mismas reglas que @IsStrongPassword() en el backend, para avisar antes de enviar
            if (!value) return 'La contraseña es requerida.';
            if (value.length < 8) return 'La contraseña debe tener al menos 8 caracteres.';
            if (!/[a-z]/.test(value) || !/[A-Z]/.test(value)) return 'Debe incluir mayúsculas y minúsculas.';
            if (!/\d/.test(value)) return 'Debe incluir al menos un número.';
            if (!/[^A-Za-z0-9]/.test(value)) return 'Debe incluir al menos un símbolo.';
            break;
    }
    return undefined;
};

/**
 * Hook que maneja el FORMULARIO de registro: valores de los campos, errores de validación
 * y mostrar/ocultar la contraseña. No llama al backend: cuando todo es válido,
 * entrega los datos a la función onSubmitCallback que recibe.
 *
 * Es el equivalente a useLoginForm en el login.
 *
 * @param onSubmitCallback función que se ejecuta con los datos válidos (normalmente useRegister().register).
 *                         Debe retornar true si el registro salió bien, para limpiar el formulario.
 */
export function useRegisterForm(onSubmitCallback: (payload: RegisterPayload) => Promise<boolean>) {

    const [values, setValues] = useState<RegisterPayload>(INITIAL_VALUES);
    const [errors, setErrors] = useState<RegisterValidationErrors>({});
    const [showPassword, setShowPassword] = useState<boolean>(false);

    /**
     * Se ejecuta cada vez que el usuario escribe en un campo o cambia el rol.
     * Sirve para inputs y selects porque los dos tienen "name" y "value".
     * Usa el atributo name del elemento para saber qué propiedad actualizar.
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const fieldName = name as keyof RegisterPayload;

        // [fieldName] es una propiedad calculada: actualiza solo el campo que cambió
        setValues((prev) => ({ ...prev, [fieldName]: value }));
        // Validamos mientras escribe, para que el error aparezca o desaparezca al instante
        setErrors((prev) => ({ ...prev, [fieldName]: validateField(fieldName, value) }));
    };

    /** Alterna entre mostrar y ocultar la contraseña (botón del ojo). */
    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    /**
     * Se ejecuta al enviar el formulario.
     * Valida TODOS los campos (aunque el usuario no los haya tocado) y solo si no hay errores
     * llama a onSubmitCallback. Si el registro sale bien, limpia el formulario.
     */
    const handleSubmit = async (e: React.FormEvent) => {
        // Evita que el navegador recargue la página, que es lo que hace un <form> por defecto
        e.preventDefault();

        const newErrors: RegisterValidationErrors = {};
        FIELDS.forEach((field) => {
            const message = validateField(field, values[field]);
            if (message) newErrors[field] = message;
        });

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        const ok = await onSubmitCallback(values);
        if (ok) setValues(INITIAL_VALUES);
    };

    return {
        values,
        errors,
        showPassword,
        handleChange,
        toggleShowPassword,
        handleSubmit
    };
}
