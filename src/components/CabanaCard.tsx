import Image from "next/image";
import { Cabana } from "@/src/models/Cabana";

interface CabanaCardProps {
  cabana: Cabana;
}

export default function CabanaCard({ cabana }: CabanaCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
      
      {/* Imagen */}
      <div className="relative h-56 w-full">
        <Image
          src={cabana.fotos[0]}
          alt={cabana.nombre}
          fill
          className="object-cover"
        />

        {/* Categoría */}
        <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-sm font-medium text-gray-800 shadow">
          {cabana.categoria}
        </span>

        {/* Calificación */}
        <span className="absolute right-4 top-4 rounded-full bg-white px-3 py-1 text-sm font-semibold text-gray-800 shadow">
          ⭐ {cabana.calificacion}
        </span>
      </div>

      {/* Información */}
      <div className="p-5">
        
        <h2 className="text-xl font-semibold text-gray-900">
          {cabana.nombre}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          📍 {cabana.ubicacion}
        </p>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <span>👥 {cabana.capacidad} personas</span>
          <span>🌤️ {cabana.clima}</span>
        </div>

        {/* Comodidades */}
        <div className="mt-4 flex flex-wrap gap-2">
          {cabana.comodidades.slice(0, 3).map((comodidad) => (
            <span
              key={comodidad}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
            >
              {comodidad}
            </span>
          ))}
        </div>

        {/* Precio y reserva */}
        <div className="mt-5 flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900">
              ${cabana.precio.toLocaleString("es-CO")}
            </span>

            <span className="text-sm text-gray-500">
              {" "} / noche
            </span>
          </div>

          <button className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800">
            Reservar
          </button>
        </div>

      </div>
    </article>
  );
}