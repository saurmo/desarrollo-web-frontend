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
            <div className="flex gap-2">
                <label htmlFor="activo">Activo:</label>
                <input id="activo" className="border-2 border-gray-300 rounded-md p-2" type="checkbox" checked={activo} onChange={handleChange} />
            </div>
            <p>Activo: {activo ? "Activo" : "Inactivo"}</p>
        </div>
    )

}

export default Activo;

