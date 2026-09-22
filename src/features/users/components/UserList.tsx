'use client';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useUsers } from "../hooks/useUsers";
import { UserCard } from "./UserCard";
import { Pagination } from "../../common/components/Pagination";

export default function UserListPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // La URL es la fuente de verdad de la página actual:
  // se puede compartir el enlace y el botón "atrás" del navegador funciona.
  const page = Number(searchParams.get('page')) || 1;

  const { error, isLoading, users } = useUsers(page);

  const handlePageChange = (nextPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(nextPage));
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  if (error) {
    return <>Ha ocurrido un error {error}</>
  }

  const totalPages = users.pagination.totalPages ?? 0;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      {isLoading ? (
        <p className="text-slate-300">Cargando...</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {users.data.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}

      <div className="mt-10">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          isLoading={isLoading}
        />
      </div>
    </main>
  );
}
