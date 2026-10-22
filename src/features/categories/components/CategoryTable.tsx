'use client';
import { Pencil, Tags, Trash2 } from "lucide-react";
import { Category } from "../domain/Category";

interface CategoryTableProps {
    categories: Category[];
    onEdit: (category: Category) => void;
    onDelete: (category: Category) => void;
}

/** Formatea la fecha de creación en español; si no hay fecha muestra un guion. */
const formatDate = (value: string | null) =>
    value ? new Date(value).toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" }) : "—";

/**
 * Tabla de categorías. Solo dibuja: las acciones de editar y eliminar
 * se las entrega al componente padre mediante onEdit y onDelete.
 */
export function CategoryTable({ categories, onEdit, onDelete }: CategoryTableProps) {
    if (categories.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-slate-700 p-10 text-center">
                <Tags className="mx-auto h-10 w-10 text-slate-600" aria-hidden="true" />
                <p className="mt-3 text-sm text-slate-400">No hay categorías para mostrar.</p>
            </div>
        );
    }

    return (
        // overflow-x-auto: en pantallas pequeñas la tabla se desplaza en lugar de romper el diseño
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60">
            <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="border-b border-slate-800 text-xs uppercase tracking-wider text-slate-400">
                    <tr>
                        <th scope="col" className="px-4 py-3 font-semibold">Nombre</th>
                        <th scope="col" className="px-4 py-3 font-semibold">Descripción</th>
                        <th scope="col" className="px-4 py-3 font-semibold">Creada</th>
                        <th scope="col" className="px-4 py-3 text-right font-semibold">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                    {categories.map((category) => (
                        <tr key={category.id} className="transition-colors hover:bg-white/[0.02]">
                            <td className="px-4 py-3 font-medium text-white">{category.name}</td>
                            <td className="max-w-xs truncate px-4 py-3 text-slate-300" title={category.description ?? undefined}>
                                {category.description || <span className="text-slate-600">Sin descripción</span>}
                            </td>
                            <td className="whitespace-nowrap px-4 py-3 text-slate-400">{formatDate(category.createdAt)}</td>
                            <td className="px-4 py-3">
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => onEdit(category)}
                                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-800"
                                        aria-label={`Editar ${category.name}`}
                                    >
                                        <Pencil className="h-3.5 w-3.5" /> Editar
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => onDelete(category)}
                                        className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/30 px-3 py-1.5 text-xs font-medium text-red-300 hover:bg-red-500/10"
                                        aria-label={`Eliminar ${category.name}`}
                                    >
                                        <Trash2 className="h-3.5 w-3.5" /> Eliminar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
