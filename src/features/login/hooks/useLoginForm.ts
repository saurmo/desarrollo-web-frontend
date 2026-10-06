'use client';
import { useState } from "react";
import { LoginCredentials, ValidationErrors } from "../domain/auth";


export function useLoginForm(onSubmitCallback: (credentials: LoginCredentials) => void) {
   
    const [credentials, setCredentials] = useState<LoginCredentials>({
        email: 'usuario@udem.edu.co',
        password: 'Password123!'
    });

    const [errors, setErrors] = useState<ValidationErrors>({});
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const validateField = (field: keyof LoginCredentials, value: string): string | undefined => {
        if (field === 'email') {
            if (!value.trim()) return 'El correo electrónico es requerido.';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) return 'Ingresa un formato de correo válido.';
        }
        if (field === 'password') {
            if (!value) return 'La contraseña es requerida.';
            if (value.length < 6) return 'La contraseña debe tener al menos 6 caracteres.';
        }
        return undefined;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const fieldName = name as keyof LoginCredentials;

        setCredentials((prev) => ({ ...prev, [fieldName]: value }));

        // Instant validation clear / check
        const errorMsg = validateField(fieldName, value);
        setErrors((prev) => ({ ...prev, [fieldName]: errorMsg }));
    };

    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const fillDemoCredentials = (type: 'valid' | 'invalid' | 'serverError') => {
        if (type === 'valid') {
            setCredentials({ email: 'usuario@udem.edu.co', password: 'Password123!' });
            setErrors({});
        } else if (type === 'invalid') {
            setCredentials({ email: 'incorrecto@udem.edu.co', password: '321' });
            setErrors({ password: 'La contraseña debe tener al menos 6 caracteres.' });
        } else {
            setCredentials({ email: 'error@udem.edu.co', password: 'Password123!' });
            setErrors({});
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const emailErr = validateField('email', credentials.email);
        const passErr = validateField('password', credentials.password);

        if (emailErr || passErr) {
            setErrors({ email: emailErr, password: passErr });
            return;
        }

        setErrors({});
        onSubmitCallback(credentials);
    };

    return {
        credentials,
        errors,
        showPassword,
        handleChange,
        toggleShowPassword,
        handleSubmit,
        fillDemoCredentials
    };
}