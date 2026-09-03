
import { CabinCard, Cabin } from '@/src/components/CabinCard';

const SAMPLE_CABINS: Cabin[] = [
  {
    id: '1',
    nombre: 'Cabaña Alpina El Refugio',
    ubicacion: 'Guatavita, Cundinamarca',
    precio: 280000,
    capacidad: 4,
    comodidades: ['Jacuzzi privado', 'Malla catamarán', 'Zona de fogata', 'Wifi high-speed'],
    clima: 'Frío (14°C)',
    calificacion: 4.9,
    fotos: [
      'https://images.unsplash.com/photo-1587061949409-02df41d5e562',
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739',
    ],
    videos: ['https://example.com/video.mp4'],
    politicaCancelacion: 'Cancelación gratuita hasta 48h antes',
    categorias: ['Glamping', 'Romántica'],
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {SAMPLE_CABINS.map((cabin) => (
          <CabinCard key={cabin.id} cabin={cabin} />
        ))}
      </div>
    </main>
  );
}