'use client';

import { Usuario } from "@/src/domain/models/Usuario";
import { useEffect, useState } from "react";
import ItemUsuario from "./ItemUsuario";



const ListaUsuarios = () => {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]); // Array de usuarios
    const [loading, setLoading] = useState<boolean>(true); // Booleano para indicar si se está cargando
    const [error, setError] = useState<string | null>(null); // String para indicar el error

    // Ejecuta el efecto cuando el componente se monta (mount)
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users") // URL de la API de usuarios
            .then(response => response.json())
            .then(data => {
                setUsuarios(data)
                console.log(data)
            })
            .catch(error => setError(error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div>Cargando usuarios...</div>;
    }

    if (error) {
        return <div>Error al cargar los usuarios: {error}</div>;
    }

    if (usuarios.length === 0) {
        return <div>No hay usuarios</div>;
    }

    return (
        <div>
            <h1>Lista de Usuarios {usuarios.length}</h1>
            <ul className="list-disc list-inside">
                {usuarios.map((usuario) => (
                   <ItemUsuario usuario={usuario} key={usuario.id} />
                ))}
            </ul>
        </div>
    )
}

export default ListaUsuarios;