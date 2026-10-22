'use client';
import { X } from "lucide-react";
import { useEffect } from "react";

interface ModalProps {
    title: string;
    /** Si es false, el modal no se dibuja. */
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

/**
 * Ventana modal reutilizable: fondo oscuro, tarjeta centrada y botón de cerrar.
 * Se cierra con la tecla Escape, con la ✕ o haciendo clic fuera de la tarjeta.
 */
export function Modal({ title, isOpen, onClose, children }: ModalProps) {
    // Escuchar Escape solo mientras el modal está abierto; la función de limpieza quita el listener
    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={onClose}>
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                // stopPropagation: un clic dentro de la tarjeta no debe cerrar el modal
                onClick={(event) => event.stopPropagation()}
                className="w-full max-w-lg rounded-3xl border border-emerald-100 bg-white p-6 text-slate-800 shadow-2xl"
            >
                <div className="mb-5 flex items-center justify-between">
                    <h2 id="modal-title" className="text-lg font-bold text-slate-900">{title}</h2>
                    <button type="button" onClick={onClose} aria-label="Cerrar" className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                        <X className="h-5 w-5" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}
