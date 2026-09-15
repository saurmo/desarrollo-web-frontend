'use client'
import {  useEffect, useState } from "react"


export const Contador = () => {
    const [contador, setContador] = useState(0)

    const handlerContador = () => { 
        setContador(contador + 1) }

    useEffect(()=>{
        console.log("Carga de página")
    }, [])

    useEffect(()=>{
        console.log("Cambia el contador", contador)
    }, [contador])

    return <>
        <span> {contador} </span>
        <button onClick={handlerContador }>
            Incrementar
        </button>

    </>
}
