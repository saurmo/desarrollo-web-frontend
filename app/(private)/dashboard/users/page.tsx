import { Suspense } from 'react';
import { Loading } from '@/src/features/common/components/Loading';
import { RoleGuard } from '@/src/features/dashboard/components/RoleGuard';
import UserListPage from '@/src/features/users/components/UserList';

/** /dashboard/users: CRUD de usuarios, solo para administradores. */
export default function UsersPage() {
  return (
    <RoleGuard roles={['admin','owner']}>
      <Suspense fallback={<Loading />}>
        <UserListPage />
      </Suspense>
    </RoleGuard>
  );
}
