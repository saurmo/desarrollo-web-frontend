'use client';

import { CabinCard } from '@/src/components/CabinCard';
import { Pagination } from '@/src/features/common/components/Pagination';
import { useListings } from '@/src/features/listings/hooks/useListings';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';


export const ListingsList = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const currentPath = usePathname()

    const page = Number(searchParams.get("page") ?? 0)


    const { error, isLoading, lintings } = useListings(page)
    const totalPages = lintings.pagination.totalPages ?? 0

    const handleOnPageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams) // conservar los parametros de la url
        params.set("page", String(newPage))
        router.push(`${currentPath}?${params.toString()}`)

    }

    if (isLoading) {
        return <>Cargando...</>
    }
    if (error) {
        return <>Ha ocurrido un error {error}</>
    }
    return (
        <main className="mx-auto max-w-7xl px-4 py-10">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {lintings?.data?.map((linting) => (
                    <CabinCard key={linting.id} cabin={linting} />
                ))}

            </div>
            <div className='mt-10'>
                <Pagination currentPage={page} onPageChange={handleOnPageChange} totalPages={totalPages} />
            </div>
        </main>
    )
}