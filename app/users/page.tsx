import { Suspense } from 'react';
import UserListPage from '@/src/features/users/components/UserList';

export default function HomePage() {
  // useSearchParams obliga a un límite de Suspense para que el resto
  // de la ruta pueda prerenderizarse.
  return (
    <Suspense fallback={<p className="p-10 text-slate-300">Cargando...</p>}>
      <UserListPage />
    </Suspense>
  );
}
