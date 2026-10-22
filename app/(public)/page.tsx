'use client';
import { ListingsList } from '@/src/features/listings/components/ListingsList';
import { Suspense } from 'react';
import { Loading } from '@/src/features/common/components/Loading';

export default function HomePage() {

  return (
    <Suspense fallback={<Loading fullScreen />} >
      <ListingsList />
    </Suspense>
  );
}