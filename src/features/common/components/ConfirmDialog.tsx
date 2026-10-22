'use client';
import { AlertTriangle } from "lucide-react";
import { Button } from "./Button";
import { Modal } from "./Modal";

interface ConfirmDialogProps {
    isOpen: boolean;
    title: string;
    message: React.ReactNode;
    confirmLabel?: string;
    /** Mientras es true, el botón de confirmar muestra "Procesando..." y no se puede volver a pulsar. */
    isLoading?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

/**
 * Diálogo de confirmación para acciones destructivas, como eliminar.
 * Evita que un clic accidental borre un registro.
 */
export function ConfirmDialog({ isOpen, title, message, confirmLabel = "Eliminar", isLoading, onConfirm, onCancel }: ConfirmDialogProps) {
    return (
        <Modal title={title} isOpen={isOpen} onClose={onCancel}>
            <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-red-500" aria-hidden="true" />
                <div className="text-sm leading-relaxed text-slate-600">{message}</div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
                <Button type="button" variant="ghost" onClick={onCancel} disabled={isLoading}>Cancelar</Button>
                <Button type="button" onClick={onConfirm} isLoading={isLoading} className="bg-red-600 hover:bg-red-700 shadow-red-600/20 border-red-500/30">
                    {confirmLabel}
                </Button>
            </div>
        </Modal>
    );
}
