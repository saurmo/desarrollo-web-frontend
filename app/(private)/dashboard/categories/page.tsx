import { Suspense } from 'react';
import { Loading } from '@/src/features/common/components/Loading';
import { RoleGuard } from '@/src/features/dashboard/components/RoleGuard';
import { CategoriesView } from '@/src/features/categories/components/CategoriesView';

/** /dashboard/categories: CRUD de categorías, solo para administradores. */
export default function CategoriesPage() {
  return (
    <RoleGuard roles={['admin']}>
      {/* Suspense: CategoriesView lee la página y la búsqueda de la URL con useSearchParams */}
      <Suspense fallback={<Loading />}>
        <CategoriesView />
      </Suspense>
    </RoleGuard>
  );
}
