'use client';
import { AlertCircle } from "lucide-react";

/** Tipos de alerta disponibles: cada uno tiene sus colores. */
type AlertType = 'error' | 'success' | 'info';

interface AlertProps {
    /** Tipo de alerta. Por defecto, 'error'. */
    type?: AlertType;
    /** Título corto en mayúsculas (opcional). */
    title?: string;
    /** Mensaje principal de la alerta. */
    message: string;
    /** Si se envía, aparece una ✕ que llama esta función al hacer clic (por ejemplo, para limpiar el error). */
    onClose?: () => void;
}

const styles: Record<AlertType, string> = {
    error: 'bg-red-50 border-red-200 text-red-900',
    success: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    info: 'bg-blue-50 border-blue-200 text-blue-900'
};

const iconColors: Record<AlertType, string> = {
    error: 'text-red-500',
    success: 'text-emerald-600',
    info: 'text-blue-500'
};

/**
 * Caja de mensaje para mostrar errores del backend o confirmaciones.
 * El componente no guarda estado: quien lo usa decide cuándo mostrarlo y qué hacer al cerrarlo.
 */
export function Alert({ type = 'error', title, message, onClose }: AlertProps) {
    return (
        <div role="alert" className={`p-4 rounded-xl border flex items-start gap-3 transition-all animate-fadeIn ${styles[type]}`}>
            <AlertCircle className={`w-5 h-5 shrink-0 mt-0.5 ${iconColors[type]}`} />
            <div className="flex-1 text-sm">
                {title && <h5 className="font-semibold text-xs uppercase tracking-wider mb-0.5">{title}</h5>}
                <p className="text-slate-700 leading-relaxed">{message}</p>
            </div>
            {onClose && (
                <button type="button" onClick={onClose} aria-label="Cerrar alerta" className="text-slate-400 hover:text-slate-600 text-xs font-bold p-1">
                    ✕
                </button>
            )}
        </div>
    );
}
