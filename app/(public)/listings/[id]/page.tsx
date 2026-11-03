import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft, MapPin, Star, Sun, Tag, Users } from 'lucide-react';
import { getPhotoUrl, Listing } from '@/src/features/listings/domain/Listing';
import { getListingById } from '@/src/features/listings/services/listing.server';

/**
 * /listings/[id]: página individual de una propiedad, pensada para SEO.
 *
 * Es un Server Component (no tiene 'use client'): Next pide los datos a la API en el servidor
 * y entrega el HTML completo. Google y las redes sociales leen el título, la descripción y las
 * fotos sin ejecutar JavaScript. La lista de la página de inicio, en cambio, se llena en el
 * navegador con useEffect: un buscador que no ejecuta JS la ve vacía.
 */

/** Frase corta para la etiqueta <meta name="description"> y las tarjetas de redes sociales. */
const describe = (listing: Listing) =>
  `${listing.name} en ${listing.location}: capacidad para ${listing.capacity} personas, clima ${listing.weather.toLowerCase()}, desde $${listing.price.toLocaleString('es-CO')} por noche.`;

// Define el <title>, la descripción, la URL canónica y Open Graph (la vista previa al compartir en WhatsApp o redes)
export async function generateMetadata({ params }: PageProps<'/listings/[id]'>): Promise<Metadata> {
  const { id } = await params;
  const listing = await getListingById(id);
  if (!listing) return { title: 'Propiedad no encontrada' };

  const photos = listing.photos.map(getPhotoUrl).filter((url): url is string => url !== null);
  return {
    title: `${listing.name} · ${listing.location}`,
    description: describe(listing),
    // canonical: la URL "oficial". Evita que /listings/abc y /listings/abc?ref=whatsapp cuenten como páginas distintas
    alternates: { canonical: `/listings/${listing.id}` },
    openGraph: {
      title: listing.name,
      description: describe(listing),
      url: `/listings/${listing.id}`,
      type: 'website',
      images: photos.slice(0, 1),
    },
  };
}

export default async function ListingPage({ params }: PageProps<'/listings/[id]'>) {
  const { id } = await params;
  const listing = await getListingById(id);
  // notFound() muestra la página 404 y responde con código 404: Google no indexa propiedades que no existen
  if (!listing) notFound();

  const photos = listing.photos.map(getPhotoUrl).filter((url): url is string => url !== null);
  const [mainPhoto, ...otherPhotos] = photos;

  // Datos estructurados (schema.org): le dicen al buscador que esto es un alojamiento, con su precio y ubicación
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: listing.name,
    description: describe(listing),
    image: photos,
    address: { '@type': 'PostalAddress', addressLocality: listing.location },
    priceRange: `$${listing.price.toLocaleString('es-CO')} por noche`,
    ...(listing.rating > 0 && {
      aggregateRating: { '@type': 'AggregateRating', ratingValue: listing.rating, bestRating: 5 },
    }),
  };

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8">
      <script
        type="application/ld+json"
        // Se reemplaza "<" para que un nombre como "</script><script>..." no pueda inyectar código (XSS)
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      <nav aria-label="Ruta de navegación" className="mb-6">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-emerald-400 hover:text-emerald-300">
          <ChevronLeft className="h-4 w-4" /> Todas las propiedades
        </Link>
      </nav>

      {/* Un solo <h1> por página: es lo primero que lee un buscador para saber de qué trata */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-white">{listing.name}</h1>
        <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-300">
          <span className="flex items-center gap-1"><MapPin className="h-4 w-4 text-emerald-400" /> {listing.location}</span>
          {listing.rating > 0 && (
            <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-amber-400 text-amber-400" /> {listing.rating}</span>
          )}
          {listing.categories?.length > 0 && (
            <span className="flex items-center gap-1"><Tag className="h-4 w-4 text-emerald-400" /> {listing.categories.join(', ')}</span>
          )}
        </p>
      </header>

      <section aria-label="Fotos" className="grid gap-3 md:grid-cols-4 md:grid-rows-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-800 md:col-span-2 md:row-span-2 md:aspect-auto md:min-h-80">
          {mainPhoto && (
            // priority: la foto principal es lo primero que se ve; se descarga antes que lo demás (mejora el LCP)
            <Image src={mainPhoto} alt={`Foto principal de ${listing.name}`} fill priority
              sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          )}
        </div>
        {otherPhotos.slice(0, 4).map((photo, index) => (
          <div key={photo} className="relative hidden aspect-[4/3] overflow-hidden rounded-2xl bg-slate-800 md:block">
            <Image src={photo} alt={`Foto ${index + 2} de ${listing.name}`} fill sizes="25vw" className="object-cover" />
          </div>
        ))}
      </section>

      <section className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="space-y-4 md:col-span-2">
          <h2 className="text-xl font-semibold text-white">Sobre este lugar</h2>
          <p className="leading-relaxed text-slate-300">{describe(listing)}</p>
          <ul className="flex flex-wrap gap-4 text-sm text-slate-300">
            <li className="flex items-center gap-2"><Users className="h-4 w-4 text-slate-400" /> {listing.capacity} huéspedes</li>
            <li className="flex items-center gap-2"><Sun className="h-4 w-4 text-amber-400" /> {listing.weather}</li>
          </ul>
          {listing.comodities?.length > 0 && (
            <>
              <h2 className="pt-2 text-xl font-semibold text-white">Comodidades</h2>
              <ul className="flex flex-wrap gap-2">
                {listing.comodities.map((item) => (
                  <li key={item} className="rounded-lg bg-white/5 px-3 py-1 text-sm text-slate-300">{item}</li>
                ))}
              </ul>
            </>
          )}
        </div>

        <aside className="h-fit rounded-2xl border border-emerald-500/20 bg-slate-900/60 p-5">
          <p>
            <span className="text-3xl font-extrabold text-white">${listing.price.toLocaleString('es-CO')}</span>
            <span className="text-sm text-slate-400"> / noche</span>
          </p>
          <button type="button" className="mt-4 w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700">
            Reservar
          </button>
        </aside>
      </section>
    </main>
  );
}
