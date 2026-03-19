import { Usuario } from "@/src/domain/models/Usuario";


// Parámetros: usuario: Usuario
const ItemUsuario = (params: { usuario: Usuario }) => {
    return (
        <li className="list-item" id={params.usuario.id.toString()}>
            <p>{params.usuario.name}</p> <code>{params.usuario.email}</code>
        </li>
    )
}

export default ItemUsuario;