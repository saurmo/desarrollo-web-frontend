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

const main = () => {
    funcionA().then(() => {
        funcionB()
        funcionC()
        funcionD().then((mensaje) => {
            console.log(mensaje);
            funcionE()
        }).catch(error => {

        })
    }).catch(error => {

    })
}


main()