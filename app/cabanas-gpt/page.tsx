import CabanaCard from "@/src/components/CabanaCard";
import { cabanas } from "@/src/data/cabanas";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      
      <h1 className="mb-8 text-3xl font-bold">
        Encuentra tu próxima cabaña
      </h1>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cabanas.map((cabana) => (
          <CabanaCard
            key={cabana.id}
            cabana={cabana}
          />
        ))}
      </section>

    </main>
  );
}