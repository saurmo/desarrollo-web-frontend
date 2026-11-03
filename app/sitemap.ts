import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/src/features/common/config';
import { getListingsPage } from '@/src/features/listings/services/listing.server';

// El sitemap se vuelve a generar como máximo cada hora
export const revalidate = 3600;

/**
 * /sitemap.xml: la lista de páginas que queremos que Google indexe.
 * Sin él, el buscador solo encuentra las propiedades siguiendo enlaces.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages: MetadataRoute.Sitemap = [{ url: SITE_URL, changeFrequency: 'daily', priority: 1 }];
  try {
    // La API pagina de a 50: se recorren todas las páginas
    let page = 1;
    let totalPages = 1;
    do {
      const { data, pagination } = await getListingsPage(page);
      totalPages = pagination.totalPages ?? 1;
      data.forEach((listing) => pages.push({
        url: `${SITE_URL}/listings/${listing.id}`,
        lastModified: listing.createdAt ?? undefined,
        changeFrequency: 'weekly',
        priority: 0.8,
      }));
      page++;
    } while (page <= totalPages);
  } catch (error) {
    // Si la API está apagada (por ejemplo, durante el build), se publica el sitemap sin propiedades
    console.error('No se pudieron cargar las propiedades para el sitemap', error);
  }
  return pages;
}
