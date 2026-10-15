'use client';
import { RefreshCw } from "lucide-react";
import React from "react";

/** Estilos disponibles del botón. */
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

/**
 * Props del botón: todos los atributos normales de un <button> (type, onClick, disabled...)
 * más el estado de carga y la variante visual.
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Mientras sea true, el botón se deshabilita y muestra "Procesando...". */
    isLoading?: boolean;
    /** Variante visual. Por defecto, 'primary'. */
    variant?: ButtonVariant;
}

const baseStyles = 'inline-flex items-center justify-center font-medium text-sm rounded-xl px-4 py-2.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-emerald-500/40 active:scale-[0.99]';

/** Clases de Tailwind de cada variante. Guardarlas en un objeto evita una cadena de if/else. */
const variants: Record<ButtonVariant, string> = {
    primary: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 border border-emerald-500/30',
    secondary: 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-200/60',
    outline: 'border border-emerald-300 hover:border-emerald-500 text-emerald-800 bg-emerald-50/50 hover:bg-emerald-100/50',
    ghost: 'text-emerald-700 hover:bg-emerald-100/60'
};

/**
 * Botón reutilizable con estado de carga.
 * Se deshabilita solo mientras isLoading es true, para evitar envíos dobles del formulario.
 */
export function Button({ children, isLoading, variant = 'primary', className = '', ...props }: ButtonProps) {
    return (
        <button className={`${baseStyles} ${variants[variant]} ${className}`} disabled={isLoading || props.disabled} {...props}>
            {isLoading ? (
                <span className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-current" />
                    <span>Procesando...</span>
                </span>
            ) : (
                children
            )}
        </button>
    );
}
