'use client'
import { useEffect, useState } from "react"


export const Contador = () => {
    const [contador, setContador] = useState(0)

    useEffect(() => {
        const printHelloPage = () => {
            console.log("Hola Mundo")
        }
        printHelloPage()

    }, [])

    useEffect(() => {
        const printHelloPage = () => {
            console.log("Se actualizo el contador " + contador)
        }
        printHelloPage()

    }, [contador])

    // funciones
    const handdlerContador = () => { setContador(contador + 1) }

    return <>
        <span>Contador: {contador} </span>
        <button onClick={handdlerContador}>
            Incrementar
        </button>

    </>
}
