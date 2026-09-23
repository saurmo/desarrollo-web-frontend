import { Suspense } from 'react';
import UserListPage from '@/src/features/users/components/UserList';

export default function HomePage() {

  return (
    <Suspense fallback={<p>Cargando.....</p>}>
      <UserListPage />
    </Suspense>
  );
}
