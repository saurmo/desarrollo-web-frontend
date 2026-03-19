"use client";
import { useState } from "react";


const Nombre = () => {
    const [nombre, setNombre] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNombre(value);
    }

    return (
        <div>
            <label htmlFor="nombre">Nombre:</label>
            <input id="nombre" className="border-2 border-gray-300 rounded-md p-2" type="text" value={nombre} onChange={handleChange} />
            <p>Nombre: {nombre}</p>
        </div>
    )
}

export default Nombre;