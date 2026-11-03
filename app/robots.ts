import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/src/features/common/config';

/** /robots.txt: qué pueden recorrer los buscadores. El panel privado no debe aparecer en Google. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/dashboard', '/login', '/register'] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
