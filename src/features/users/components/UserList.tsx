'use client';
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Pagination } from "../../common/components/Pagination";
import { useUsers } from "../hooks/useUsers";
import { UserCard } from "./UserCard";

export default function UserListPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const currentPath = usePathname()

  const currentPage = Number(searchParams.get("page") ?? 1)
  const { error, isLoading, users } = useUsers(currentPage);

  const totalPages = users.pagination.totalPages ?? 0

  const handlerOnPageChange = (newPage: number) => {
    const params=new URLSearchParams(searchParams) // IMPORTANTE: Conserva los parametros de la url actual
    params.set("page", String(newPage))
    router.push(`${currentPath}?${params.toString()}`)
  }

  if (error) {
    return <>Ha ocurrido un error {error}</>
  }


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
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlerOnPageChange} isLoading={isLoading} />
      </div>

    </main>
  );
}
