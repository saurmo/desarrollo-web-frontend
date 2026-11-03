'use client';
import { Plus } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Alert } from "../../common/components/Alert";
import { ConfirmDialog } from "../../common/components/ConfirmDialog";
import { Loading } from "../../common/components/Loading";
import { Pagination } from "../../common/components/Pagination";
import { useSession } from "../../dashboard/context/SessionContext";
import { Listing, ListingFormValues } from "../domain/Listing";
import { useListingActions } from "../hooks/useListingActions";
import { useListings } from "../hooks/useListings";
import { AddPhotosModal } from "./AddPhotosModal";
import { ListingFormModal } from "./ListingFormModal";
import { ListingTable } from "./ListingTable";

/** Qué está abierto: nada, el modal de crear, el de agregar fotos o la confirmación de eliminar. */
type Dialog =
    | { type: "none" }
    | { type: "create" }
    | { type: "photos"; listing: Listing }
    | { type: "delete"; listing: Listing };

/**
 * Pantalla de propiedades del panel (admin y owner). Une las piezas:
 *  - useListings: la lista paginada (la página viene de la URL: ?page=2).
 *  - useListingActions: crear con imágenes, agregar fotos y eliminar.
 *  - ListingTable, ListingFormModal, AddPhotosModal y ConfirmDialog: lo que se ve.
 */
export function ListingsAdminView() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const page = Number(searchParams.get("page") ?? 1);

    const { user } = useSession();
    const { lintings: listings, isLoading, error, reload } = useListings(page);
    const actions = useListingActions();
    const [dialog, setDialog] = useState<Dialog>({ type: "none" });
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Solo para mostrar u ocultar botones: quien decide de verdad es la API (403)
    const canManage = (listing: Listing) => user.role === "admin" || listing.createdBy === String(user.id);

    const goToPage = (newPage: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", String(newPage));
        router.push(`${pathname}?${params.toString()}`);
    };

    const open = (next: Dialog) => {
        actions.clearError();
        setDialog(next);
    };
    const closeDialog = () => setDialog({ type: "none" });

    const handleCreate = async (values: ListingFormValues, photos: File[]): Promise<boolean> => {
        const ok = await actions.create(values, photos);
        if (ok) {
            closeDialog();
            setSuccessMessage(`Se creó la propiedad "${values.name.trim()}" con ${photos.length} foto(s).`);
            // La propiedad nueva queda de primera (orden por fecha): se vuelve a la página 1
            if (page === 1) reload(); else goToPage(1);
        }
        return ok;
    };

    const handleAddPhotos = async (photos: File[]): Promise<boolean> => {
        if (dialog.type !== "photos") return false;
        const ok = await actions.addPhotos(dialog.listing.id, photos);
        if (ok) {
            setSuccessMessage(`Se agregaron ${photos.length} foto(s) a "${dialog.listing.name}".`);
            closeDialog();
            reload();
        }
        return ok;
    };

    const handleDelete = async () => {
        if (dialog.type !== "delete") return;
        const { listing } = dialog;
        const ok = await actions.remove(listing.id);
        closeDialog();
        if (!ok) return;
        setSuccessMessage(`Se eliminó la propiedad "${listing.name}".`);
        if (listings.data.length === 1 && page > 1) goToPage(page - 1); else reload();
    };

    return (
        <section className="mx-auto max-w-6xl">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Propiedades</h1>
                    <p className="mt-1 text-sm text-slate-400">{listings.pagination.total ?? 0} propiedades activas</p>
                </div>
                <button
                    type="button"
                    onClick={() => open({ type: "create" })}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700"
                >
                    <Plus className="h-4 w-4" /> Nueva propiedad
                </button>
            </div>

            {successMessage && (
                <div className="mb-4">
                    <Alert type="success" message={successMessage} onClose={() => setSuccessMessage(null)} />
                </div>
            )}
            {/* Error al eliminar: el diálogo ya se cerró, así que se muestra aquí */}
            {actions.error && dialog.type === "none" && (
                <div className="mb-4">
                    <Alert type="error" title="No se pudo completar la acción" message={actions.error} onClose={actions.clearError} />
                </div>
            )}

            {isLoading ? (
                <Loading message="Cargando propiedades..." />
            ) : error ? (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-center">
                    <p className="text-sm text-red-300">{error}</p>
                    <button type="button" onClick={reload} className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
                        Reintentar
                    </button>
                </div>
            ) : (
                <ListingTable
                    listings={listings.data}
                    canManage={canManage}
                    onAddPhotos={(listing) => open({ type: "photos", listing })}
                    onDelete={(listing) => open({ type: "delete", listing })}
                />
            )}

            <div className="mt-6">
                <Pagination currentPage={page} totalPages={listings.pagination.totalPages ?? 0} onPageChange={goToPage} isLoading={isLoading} />
            </div>

            {dialog.type === "create" && (
                <ListingFormModal isSaving={actions.isSaving} apiError={actions.error} onSubmit={handleCreate} onClose={closeDialog} />
            )}
            {dialog.type === "photos" && (
                <AddPhotosModal
                    key={dialog.listing.id}
                    listing={dialog.listing}
                    isSaving={actions.isSaving}
                    apiError={actions.error}
                    onSubmit={handleAddPhotos}
                    onClose={closeDialog}
                />
            )}

            <ConfirmDialog
                isOpen={dialog.type === "delete"}
                title="Eliminar propiedad"
                message={dialog.type === "delete" && (
                    <>¿Seguro que quieres eliminar <strong className="text-slate-900">{dialog.listing.name}</strong>? Dejará de aparecer en el sitio.</>
                )}
                isLoading={actions.isSaving}
                onConfirm={handleDelete}
                onCancel={closeDialog}
            />
        </section>
    );
}
