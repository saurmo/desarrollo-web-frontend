'use client';
import { Plus, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Alert } from "../../common/components/Alert";
import { ConfirmDialog } from "../../common/components/ConfirmDialog";
import { Loading } from "../../common/components/Loading";
import { Pagination } from "../../common/components/Pagination";
import { Category, CategoryInput } from "../domain/Category";
import { useCategories } from "../hooks/useCategories";
import { useCategoryActions } from "../hooks/useCategoryActions";
import { CategoryFormModal } from "./CategoryFormModal";
import { CategoryTable } from "./CategoryTable";

/** Qué está abierto: nada, el modal de crear, el de editar (con su categoría) o la confirmación de eliminar. */
type Dialog =
    | { type: "none" }
    | { type: "form"; category: Category | null }
    | { type: "delete"; category: Category };

/**
 * Pantalla del CRUD de categorías. Une las piezas:
 *  - useCategories: la lista (página y búsqueda vienen de la URL: ?page=2&name=playa).
 *  - useCategoryActions: crear, editar y eliminar.
 *  - CategoryTable, CategoryFormModal y ConfirmDialog: lo que se ve.
 */
export function CategoriesView() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const page = Number(searchParams.get("page") ?? 1);
    const name = searchParams.get("name") ?? "";

    const { categories, isLoading, error, reload } = useCategories(page, name);
    const actions = useCategoryActions();
    const [dialog, setDialog] = useState<Dialog>({ type: "none" });
    const [searchText, setSearchText] = useState(name);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    /** Cambia los parámetros de la URL conservando los demás; eso dispara una nueva carga. */
    const updateUrl = (changes: Record<string, string | null>) => {
        const params = new URLSearchParams(searchParams);
        Object.entries(changes).forEach(([key, value]) => (value ? params.set(key, value) : params.delete(key)));
        router.push(`${pathname}?${params.toString()}`);
    };

    /** Buscar siempre vuelve a la página 1. */
    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault();
        updateUrl({ name: searchText.trim() || null, page: null });
    };

    const openForm = (category: Category | null) => {
        actions.clearError();
        setDialog({ type: "form", category });
    };
    const closeDialog = () => setDialog({ type: "none" });

    /** Guarda desde el modal: crea o edita según si hay categoría. */
    const handleSave = async (input: CategoryInput): Promise<boolean> => {
        if (dialog.type !== "form") return false;
        const isEditing = dialog.category !== null;
        const ok = isEditing ? await actions.update(dialog.category!.id, input) : await actions.create(input);
        if (ok) {
            closeDialog();
            setSuccessMessage(isEditing ? `Se actualizó la categoría "${input.name}".` : `Se creó la categoría "${input.name}".`);
            reload();
        }
        return ok;
    };

    /** Elimina después de confirmar. Si era el último elemento de la página, vuelve a la anterior. */
    const handleDelete = async () => {
        if (dialog.type !== "delete") return;
        const { category } = dialog;
        const ok = await actions.remove(category.id);
        closeDialog();
        if (!ok) return;
        setSuccessMessage(`Se eliminó la categoría "${category.name}".`);
        if (categories.data.length === 1 && page > 1) {
            updateUrl({ page: String(page - 1) });
        } else {
            reload();
        }
    };

    return (
        <section className="mx-auto max-w-5xl">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Categorías</h1>
                    <p className="mt-1 text-sm text-slate-400">
                        {categories.pagination.total ?? 0} categorías activas
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => openForm(null)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700"
                >
                    <Plus className="h-4 w-4" /> Nueva categoría
                </button>
            </div>

            <form onSubmit={handleSearch} className="mb-4 flex gap-2" role="search">
                <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <input
                        type="search"
                        aria-label="Buscar por nombre"
                        placeholder="Buscar por nombre..."
                        value={searchText}
                        onChange={(event) => setSearchText(event.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-900/60 py-2.5 pl-9 pr-3 text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    />
                </div>
                <button type="submit" className="rounded-xl border border-slate-700 px-4 text-sm font-medium text-slate-200 hover:bg-slate-800">
                    Buscar
                </button>
            </form>

            {successMessage && (
                <div className="mb-4">
                    <Alert type="success" message={successMessage} onClose={() => setSuccessMessage(null)} />
                </div>
            )}
            {/* Error al eliminar: el modal ya se cerró, así que se muestra aquí */}
            {actions.error && dialog.type === "none" && (
                <div className="mb-4">
                    <Alert type="error" title="No se pudo completar la acción" message={actions.error} onClose={actions.clearError} />
                </div>
            )}

            {isLoading ? (
                <Loading message="Cargando categorías..." />
            ) : error ? (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-center">
                    <p className="text-sm text-red-300">{error}</p>
                    <button type="button" onClick={reload} className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
                        Reintentar
                    </button>
                </div>
            ) : (
                <CategoryTable
                    categories={categories.data}
                    onEdit={(category) => openForm(category)}
                    onDelete={(category) => { actions.clearError(); setDialog({ type: "delete", category }); }}
                />
            )}

            <div className="mt-6">
                <Pagination
                    currentPage={page}
                    totalPages={categories.pagination.totalPages ?? 0}
                    onPageChange={(newPage) => updateUrl({ page: String(newPage) })}
                    isLoading={isLoading}
                />
            </div>

            {/* key: al abrir el modal para otra categoría, React crea el formulario de cero con sus valores */}
            {dialog.type === "form" && (
                <CategoryFormModal
                    key={dialog.category?.id ?? "nueva"}
                    category={dialog.category}
                    isSaving={actions.isSaving}
                    apiError={actions.error}
                    onSubmit={handleSave}
                    onClose={closeDialog}
                />
            )}

            <ConfirmDialog
                isOpen={dialog.type === "delete"}
                title="Eliminar categoría"
                message={dialog.type === "delete" && (
                    <>¿Seguro que quieres eliminar la categoría <strong className="text-slate-900">{dialog.category.name}</strong>? Dejará de aparecer en el listado.</>
                )}
                isLoading={actions.isSaving}
                onConfirm={handleDelete}
                onCancel={closeDialog}
            />
        </section>
    );
}
