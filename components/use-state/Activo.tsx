"use client";
import { useState } from "react";


const Activo = () => {

    const [activo, setActivo] = useState(false);    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.checked;
        setActivo(value);
    }

    return (
        <div>
            <h1>Componente Activo</h1>
            <input type="checkbox" checked={activo} onChange={handleChange} />
            {/* Operador ternario: si activo es true, mostrar "Activo", sino mostrar "Inactivo" */}
            <p>Estado: {activo ? "Activo" : "Inactivo"}</p>
        </div>
    )
}

export default Activo;