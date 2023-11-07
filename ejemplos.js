setTimeout(() => {
    console.log("A");
}, 500)
console.log("B");
console.log("C");
console.log("D");
setTimeout(() => {
    console.log("E");
}, 200)

// BCDEA
// ABCDE