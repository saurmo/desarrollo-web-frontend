'use client';
import Image from "next/image";
import { Home, ImagePlus, Trash2 } from "lucide-react";
import { getPhotoUrl, Listing } from "../domain/Listing";

interface ListingTableProps {
    listings: Listing[];
    /** Decide si el usuario actual puede modificar la propiedad (admin, o el owner que la creó). */
    canManage: (listing: Listing) => boolean;
    onAddPhotos: (listing: Listing) => void;
    onDelete: (listing: Listing) => void;
}

/** Tabla de propiedades del panel. Solo dibuja: las acciones se las entrega al componente padre. */
export function ListingTable({ listings, canManage, onAddPhotos, onDelete }: ListingTableProps) {
    if (listings.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-slate-700 p-10 text-center">
                <Home className="mx-auto h-10 w-10 text-slate-600" aria-hidden="true" />
                <p className="mt-3 text-sm text-slate-400">No hay propiedades para mostrar.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60">
            <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="border-b border-slate-800 text-xs uppercase tracking-wider text-slate-400">
                    <tr>
                        <th scope="col" className="px-4 py-3 font-semibold">Foto</th>
                        <th scope="col" className="px-4 py-3 font-semibold">Nombre</th>
                        <th scope="col" className="px-4 py-3 font-semibold">Ubicación</th>
                        <th scope="col" className="px-4 py-3 font-semibold">Precio</th>
                        <th scope="col" className="px-4 py-3 font-semibold">Fotos</th>
                        <th scope="col" className="px-4 py-3 text-right font-semibold">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                    {listings.map((listing) => (
                        <tr key={listing.id} className="transition-colors hover:bg-white/[0.02]">
                            <td className="px-4 py-3">
                                <div className="relative h-12 w-16 overflow-hidden rounded-lg bg-slate-800">
                                    {/* next/image solo acepta dominios de remotePatterns (next.config.ts) */}
                                    {getPhotoUrl(listing.photos[0]) && (
                                        <Image src={getPhotoUrl(listing.photos[0])!} alt={listing.name} fill sizes="64px" className="object-cover" />
                                    )}
                                </div>
                            </td>
                            <td className="px-4 py-3 font-medium text-white">{listing.name}</td>
                            <td className="px-4 py-3 text-slate-300">{listing.location}</td>
                            <td className="whitespace-nowrap px-4 py-3 text-slate-300">${listing.price.toLocaleString("es-CO")}</td>
                            <td className="px-4 py-3 text-slate-400">{listing.photos.length}</td>
                            <td className="px-4 py-3">
                                {canManage(listing) ? (
                                    <div className="flex justify-end gap-2">
                                        <button
                                            type="button"
                                            onClick={() => onAddPhotos(listing)}
                                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-800"
                                            aria-label={`Agregar fotos a ${listing.name}`}
                                        >
                                            <ImagePlus className="h-3.5 w-3.5" /> Fotos
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => onDelete(listing)}
                                            className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/30 px-3 py-1.5 text-xs font-medium text-red-300 hover:bg-red-500/10"
                                            aria-label={`Eliminar ${listing.name}`}
                                        >
                                            <Trash2 className="h-3.5 w-3.5" /> Eliminar
                                        </button>
                                    </div>
                                ) : (
                                    <p className="text-right text-xs text-slate-600">De otro propietario</p>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
