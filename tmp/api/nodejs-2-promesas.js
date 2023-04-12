
function funcionA() {
    console.log("A");
}

function funcionB() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("B");
            resolve()
        }, 1000);
    })

}

function funcionD() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("D");
            resolve("Ejecución exitosa")
        }, 1000);
    })

}



funcionA()
funcionB().then(() => {
    console.log("C");
    funcionD().then((mensaje) => {
        console.log(mensaje);
        console.log("E");
    }).catch(error => {
        console.log("Error");
    })
}).catch(error => {
    console.log("Error");
})


