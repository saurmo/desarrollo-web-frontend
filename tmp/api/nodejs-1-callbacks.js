
function funcionA() {
    console.log("A");
}

function funcionB(callback) {
    setTimeout(() => {
        console.log("B");
        callback()
    }, 1000);
}

function funcionD(callback) {
    setTimeout(() => {
        console.log("D");
        callback()
    }, 1000);
}



funcionA()
funcionB(() => {
    console.log("C");
    funcionD(() => {
        console.log("E");
    })
})


