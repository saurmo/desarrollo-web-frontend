import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // next/image solo muestra imágenes externas de estos orígenes (domains está obsoleto desde Next 14)
    remotePatterns: [
      new URL('https://images.unsplash.com/**'),
      // Fotos subidas por la API al bucket público de Supabase Storage
      { protocol: 'https', hostname: '*.supabase.co', pathname: '/storage/v1/object/public/**' },
    ],
  },
};

export default nextConfig;
