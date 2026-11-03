'use client';
import { AlertCircle } from "lucide-react";
import React from "react";

export interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: SelectOption[];
    /** Primera opción, sin valor: se muestra mientras el usuario no elige nada. */
    placeholder?: string;
    error?: string;
}

/** Lista desplegable con el mismo diseño de Input: etiqueta arriba y error debajo. */
export function Select({ label, options, placeholder, error, id, name, className = '', ...props }: SelectProps) {
    const selectId = id ?? name;

    return (
        <div className="flex flex-col gap-1.5 w-full">
            <label htmlFor={selectId} className="text-xs font-semibold text-emerald-950 uppercase tracking-wider">
                {label}
            </label>
            <select
                id={selectId}
                name={name}
                className={`w-full py-2.5 px-3.5 bg-white text-slate-900 border text-sm rounded-xl transition-all duration-200 outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-400 ${error
                    ? 'border-red-400 focus:ring-red-200 focus:border-red-500'
                    : 'border-emerald-200 focus:ring-emerald-500/20 focus:border-emerald-500 hover:border-emerald-300'
                    } ${className}`}
                {...props}
            >
                {placeholder !== undefined && <option value="">{placeholder}</option>}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
            {error && (
                <span className="text-xs font-medium text-red-600 flex items-center gap-1 mt-0.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {error}
                </span>
            )}
        </div>
    );
}
