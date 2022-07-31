const express = require('express');
const fileupload = require('express-fileupload');
const app = express()

app.use(express.json())
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(fileupload())

app.post("/", (req, res) => {
    let params = req.params
    let body = req.body
    let query_params = req.query
    let files = req.files

    return res.send({
        params, body, query_params, files
    })

})

app.listen(3000, () => {
    console.log(`App: http://localhost:3000`);
})