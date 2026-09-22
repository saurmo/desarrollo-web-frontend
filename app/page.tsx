'use client';
import { ListingsList } from '@/src/features/listings/components/ListingsList';
import { Suspense } from 'react';

export default function HomePage() {

  return (
    <Suspense fallback={<p>Cargando... frontend</p>} >
      <ListingsList />
    </Suspense>
  );
}