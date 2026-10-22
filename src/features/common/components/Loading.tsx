import { Loader2 } from "lucide-react";

interface LoadingProps {
    /** Texto que acompaña al indicador. Por defecto, "Cargando...". */
    message?: string;
    /** Si es true, ocupa todo el espacio disponible de la página y queda centrado. */
    fullScreen?: boolean;
}

/**
 * Indicador de carga reutilizable: un ícono girando y un texto.
 *
 * No usa hooks ni eventos, así que funciona tanto en componentes de cliente
 * como en el fallback de <Suspense> de una página de servidor.
 *
 * role="status" y aria-live="polite" hacen que un lector de pantalla anuncie el texto.
 */
export function Loading({ message = "Cargando...", fullScreen = false }: LoadingProps) {
    return (
        <div
            role="status"
            aria-live="polite"
            className={`flex flex-col items-center justify-center gap-3 py-16 text-slate-400 ${fullScreen ? "flex-1" : ""}`}
        >
            <Loader2 className="h-8 w-8 animate-spin text-emerald-500" aria-hidden="true" />
            <p className="text-sm font-medium">{message}</p>
        </div>
    );
}
