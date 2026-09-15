'use client';
import { CabinCard } from '@/src/components/CabinCard';
import { Contador } from '@/src/components/Contador';
import { CABINS } from '@/src/data/cabanas';
import { useListings } from '@/src/features/listings/hooks/useListings';

export default function HomePage() {
 const {error,isLoading, lintings}= useListings()
  if (isLoading) {
    return <>Cargando...</>
  }
  if (error) {
   return <>Ha ocurrido un error {error}</>
  }
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {lintings.map((linting) => (
           <CabinCard key={linting.id} cabin={linting}  />
        ))}
        {/* <Contador /> */}
        <hr />
        <br />
        {/* <Contador /> */}
      </div>
    </main>
  );
}