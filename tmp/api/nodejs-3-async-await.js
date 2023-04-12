
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


async function main() {
    try {
        funcionA()
        await funcionB()
        console.log("C");
        const mensaje = await funcionD()
        console.log(mensaje);
        console.log("E");
    } catch (error) {
        console.log("Error");
    }

}

main().then(() => {
    console.log("Finaliza ejecución");
})
console.log("Despues de main");



