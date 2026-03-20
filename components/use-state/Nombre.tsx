"use client";

import { useState } from "react";


const Nombre = () => {
    // Estado para el nombre
    const [nombre, setNombre] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNombre(value);
    }

    return (
        <div>
            <h1>Componente Nombre</h1>
            <input className="border-2 border-gray-300 rounded-md p-2" placeholder="Ingrese su nombre" type="text" value={nombre} onChange={handleChange}/>
            <p>Nombre: {nombre}</p>
        </div>
    )
}

export default Nombre;