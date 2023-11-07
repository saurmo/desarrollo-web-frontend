const funcionA = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("A");
            resolve()
        }, 500)
    })

}
const funcionB = () => { console.log("B"); }
const funcionC = () => { console.log("C"); }
const funcionD = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("D");
            resolve("Termino D - Inicio Callback")
        }, 300)
    })
}
const funcionE = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("E");
        }, 200)
    })
}

const main = async () => {
    await funcionA()
    funcionB()
    funcionC()
    const mensaje = await funcionD()
    console.log(mensaje);
    await funcionE()
    return "ok"
}

// console.log(main());
main().then(resultado => {
    console.log("termino", resultado);
}).catch(err => {
    console.log(err);
})
