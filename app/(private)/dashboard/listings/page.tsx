import { Suspense } from 'react';
import { Loading } from '@/src/features/common/components/Loading';
import { RoleGuard } from '@/src/features/dashboard/components/RoleGuard';
import { ListingsAdminView } from '@/src/features/listings/components/ListingsAdminView';

/** /dashboard/listings: propiedades con subida de imágenes, para administradores y propietarios. */
export default function ListingsPage() {
  return (
    <RoleGuard roles={['admin', 'owner']}>
      {/* Suspense: ListingsAdminView lee la página de la URL con useSearchParams */}
      <Suspense fallback={<Loading />}>
        <ListingsAdminView />
      </Suspense>
    </RoleGuard>
  );
}
