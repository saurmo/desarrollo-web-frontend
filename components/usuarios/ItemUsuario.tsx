import { Usuario } from "@/src/domain/models/Usuario"

const ItemUsuario = (params: { usuario: Usuario }) => {

    return (
        <li className="list-item p-2" id={params.usuario.id.toString()}>
            <p>{params.usuario.name}</p> <code>{params.usuario.email}</code>
        </li>
    )
}

export default ItemUsuario;