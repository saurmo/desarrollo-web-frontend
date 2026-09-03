
import { CabinCard } from '@/src/components/CabinCard';
import { CABINS } from '@/src/data/cabanas';

export default function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {CABINS.map((cabin) => (
           <CabinCard key={cabin.id} cabin={cabin}  />
        ))}
      </div>
    </main>
  );
}