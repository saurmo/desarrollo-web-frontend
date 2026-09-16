'use client';
import { useUsers } from "../hooks/useUsers";
import { UserCard } from "./UserCard";

export default function UserListPage() {
 const {error,isLoading, users}= useUsers()

  if (isLoading) {
    return <>Cargando...</>
  }
  if (error) {
   return <>Ha ocurrido un error {error}</>
  }
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {users.map((user) => (
           <UserCard key={user.id} user={user}  />
        ))}
       
  
      </div>
    </main>
  );
}