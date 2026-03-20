"use client";
import { Usuario } from "@/src/domain/models/Usuario";
import { useEffect, useState } from "react";
import ItemUsuario from "./ItemUsuario";

const ListaUsuarios = () => {
    // Estado para los usuarios
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    // Estado para el loading
    const [loading, setLoading] = useState(true);
    // Estado para el error
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Llamar a la API de usuarios
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(data => setUsuarios(data))
            .catch(error => setError(error.message))
            .finally(() => setLoading(false));
    }, [])

    if (loading) return <div>Cargando...</div>;
    // Mostrar el error si hay un error
    if (error) return <div>Error: {error}</div>;
    // Mostrar un mensaje si no hay usuarios
    if (usuarios.length === 0) return <div>No hay usuarios</div>;
    // Mostrar la lista de usuarios
    return (
        <div className="flex flex-col flex-1 items-center justify-start">
            <h1 className="text-2xl font-bold pt-10">Lista de Usuarios</h1>
            <ul>
                {usuarios.map((usuario) => (
                    <ItemUsuario key={usuario.id} usuario={usuario} />
                ))}
            </ul>
        </div>
    )
}

export default ListaUsuarios;