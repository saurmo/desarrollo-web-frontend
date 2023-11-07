
const funcionA = (callback) => {
    setTimeout(() => {
        console.log("A");
        callback(null)
    }, 500)
}
const funcionB = () => { console.log("B"); }
const funcionC = () => { console.log("C"); }
const funcionD = (callback) => {
    setTimeout(() => {
        console.log("D");
        callback({ error: "MS-001" })

    }, 300)
}
const funcionE = () => {
    setTimeout(() => {
        console.log("E");

    }, 200)
}


const main = () => {
    funcionA((error, data) => {
        if (error) {
            // manejo el error
            return
        }
        funcionB()
        funcionC()
        funcionD((error, mensaje) => {
            if (error) {
                return
            }
            console.log(mensaje);
            funcionE()
        })
    })
}


main()