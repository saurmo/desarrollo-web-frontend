
const getDataForm = () => {
    const txtName = document.getElementById("txtName").value
    const txtEmail = document.getElementById("txtEmail").value
    const txtDescription = document.getElementById("txtTask").value
    const acceptCondition = document.getElementById("acceptConditions").checked
    const typeA = document.getElementById("typeA").checked
    const typeB = document.getElementById("typeB").checked

    // JSON { clave:valor }
    const data = {
        name: txtName,
        email: txtEmail,
        description:txtDescription,
        acceptCondition:acceptCondition,
        typeA,
        typeB
    }

    console.log(data);
}