'use client';
import { AlertCircle } from "lucide-react";
import { Alert } from "../../common/components/Alert";
import { Button } from "../../common/components/Button";
import { Input } from "../../common/components/Input";
import { Modal } from "../../common/components/Modal";
import { Category, CategoryInput } from "../domain/Category";
import { useCategoryForm } from "../hooks/useCategoryForm";

interface CategoryFormModalProps {
    /** null = crear una categoría nueva; con valor = editar esa categoría. */
    category: Category | null;
    isSaving: boolean;
    /** Error que devolvió la API al guardar (por ejemplo, nombre repetido). */
    apiError: string | null;
    onSubmit: (input: CategoryInput) => Promise<boolean>;
    onClose: () => void;
}

/**
 * Modal con el formulario para crear o editar una categoría.
 * El mismo componente sirve para las dos acciones: cambia el título y los valores iniciales.
 */
export function CategoryFormModal({ category, isSaving, apiError, onSubmit, onClose }: CategoryFormModalProps) {
    const form = useCategoryForm(category, onSubmit);
    const isEditing = category !== null;

    return (
        <Modal title={isEditing ? "Editar categoría" : "Nueva categoría"} isOpen onClose={onClose}>
            {apiError && (
                <div className="mb-4">
                    <Alert type="error" title="No se pudo guardar" message={apiError} />
                </div>
            )}

            <form onSubmit={form.handleSubmit} className="space-y-4" noValidate>
                <Input
                    label="Nombre"
                    name="name"
                    placeholder="Ej. Playa"
                    value={form.values.name}
                    onChange={form.handleChange}
                    error={form.errors.name}
                    maxLength={100}
                    autoFocus
                />

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="description" className="text-xs font-semibold uppercase tracking-wider text-emerald-950">
                        Descripción <span className="font-normal normal-case text-slate-400">(opcional)</span>
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows={3}
                        maxLength={500}
                        placeholder="¿Qué tipo de propiedades agrupa esta categoría?"
                        value={form.values.description}
                        onChange={form.handleChange}
                        className={`w-full resize-none rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:ring-2 ${form.errors.description
                            ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                            : "border-emerald-200 hover:border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500/20"
                            }`}
                    />
                    <div className="flex justify-between text-xs">
                        {form.errors.description ? (
                            <span className="flex items-center gap-1 font-medium text-red-600">
                                <AlertCircle className="h-3.5 w-3.5" /> {form.errors.description}
                            </span>
                        ) : <span />}
                        <span className="text-slate-400">{form.values.description.length}/500</span>
                    </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                    <Button type="button" variant="ghost" onClick={onClose} disabled={isSaving}>Cancelar</Button>
                    <Button type="submit" isLoading={isSaving}>{isEditing ? "Guardar cambios" : "Crear categoría"}</Button>
                </div>
            </form>
        </Modal>
    );
}
