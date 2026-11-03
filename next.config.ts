import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // next/image solo muestra imágenes externas de estos orígenes (domains está obsoleto desde Next 14)
    remotePatterns: [
      // Forma de objeto y no new URL(...): new URL guarda search = '' y Next rechazaría
      // las URLs de Unsplash, que siempre traen parámetros (?auto=format&w=800...)
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      // Fotos subidas por la API al bucket público de Supabase Storage
      { protocol: 'https', hostname: '*.supabase.co', pathname: '/storage/v1/object/public/**' },
    ],
  },
};

export default nextConfig;
