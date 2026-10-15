'use client';
import { AlertCircle } from "lucide-react";
import React from "react";

/**
 * Props del campo de texto.
 * Recibe todos los atributos normales de un <input> (name, type, value, onChange...)
 * más estos cuatro propios del diseño.
 */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /** Texto que aparece encima del campo. */
    label: string;
    /** Mensaje de error. Si existe, el borde se pinta rojo y el mensaje aparece debajo. */
    error?: string;
    /** Ícono que se dibuja a la izquierda, dentro del campo. */
    icon?: React.ReactNode;
    /** Elemento a la derecha, por ejemplo el botón de mostrar/ocultar contraseña. */
    rightElement?: React.ReactNode;
}

/**
 * Campo de texto reutilizable con etiqueta, ícono y mensaje de error.
 *
 * Usa forwardRef para que un componente padre pueda acceder al <input> real
 * (por ejemplo, para enfocarlo con ref.current.focus()).
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, icon, rightElement, className = '', id, name, ...props }, ref) => {
        // El id une el <label> con el <input>: al hacer clic en la etiqueta se enfoca el campo.
        const inputId = id ?? name;

        return (
            <div className="flex flex-col gap-1.5 w-full">
                <label htmlFor={inputId} className="text-xs font-semibold text-emerald-950 uppercase tracking-wider flex items-center justify-between">
                    {label}
                </label>
                <div className="relative flex items-center">
                    {icon && (
                        <div className="absolute left-3.5 text-emerald-600/70 pointer-events-none">
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        id={inputId}
                        name={name}
                        // El padding cambia según haya ícono o elemento a la derecha, para que el texto no quede debajo.
                        className={`w-full py-2.5 ${icon ? 'pl-10' : 'pl-3.5'} ${rightElement ? 'pr-10' : 'pr-3.5'} bg-white text-slate-900 placeholder-slate-400 border text-sm rounded-xl transition-all duration-200 outline-none focus:ring-2 ${error
                            ? 'border-red-400 focus:ring-red-200 focus:border-red-500'
                            : 'border-emerald-200 focus:ring-emerald-500/20 focus:border-emerald-500 hover:border-emerald-300'
                            } ${className}`}
                        {...props}
                    />
                    {rightElement && (
                        <div className="absolute right-3.5 flex items-center">
                            {rightElement}
                        </div>
                    )}
                </div>
                {error && (
                    <span className="text-xs font-medium text-red-600 flex items-center gap-1 animate-fadeIn mt-0.5">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {error}
                    </span>
                )}
            </div>
        );
    }
);
// forwardRef pierde el nombre del componente; esto lo recupera para las React DevTools.
Input.displayName = 'Input';
