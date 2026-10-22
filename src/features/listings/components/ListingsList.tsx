'use client';

import { ListingCard } from '@/src/features/listings/components/ListingCard';
import { Pagination } from '@/src/features/common/components/Pagination';
import { Loading } from '@/src/features/common/components/Loading';
import { useListings } from '@/src/features/listings/hooks/useListings';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';


export const ListingsList = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const currentPath = usePathname()

    const page = Number(searchParams.get("page") ?? 1) // la API cuenta las páginas desde 1


    const { error, isLoading, lintings, reload } = useListings(page)
    const totalPages = lintings.pagination.totalPages ?? 0

    const handleOnPageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams) // conservar los parametros de la url
        params.set("page", String(newPage))
        router.push(`${currentPath}?${params.toString()}`)

    }

    if (isLoading) {
        return <Loading message="Cargando propiedades..." />
    }
    if (error) {
        return (
            <main className="mx-auto max-w-xl px-4 py-16">
                <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
                    <h2 className="text-lg font-semibold text-red-800">No pudimos cargar las propiedades</h2>
                    <p className="mt-2 text-sm text-red-700">{error}</p>
                    <button
                        type="button"
                        onClick={reload}
                        className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                    >
                        Reintentar
                    </button>
                </div>
            </main>
        )
    }
    return (
        <main className="mx-auto max-w-7xl px-4 py-10">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {lintings?.data?.map((linting) => (
                    <ListingCard key={linting.id} listing={linting} />
                ))}

            </div>
            <div className='mt-10'>
                <Pagination currentPage={page} onPageChange={handleOnPageChange} totalPages={totalPages} />
            </div>
        </main>
    )
}