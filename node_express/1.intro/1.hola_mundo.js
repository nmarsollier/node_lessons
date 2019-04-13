const express = require('express')
const app = express()

function holaMundo(req, res) {
    // res.send se usa para dar salida html, el content-type es
    // automático, y lo que tenemos que mandar en el parámetro es string
    res.send("Hola Mundo")
}

app.get('/', holaMundo)

app.listen(3000, () => console.log("Server iniciado"))
