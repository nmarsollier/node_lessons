const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send("Hola Mundo")
})

app.get('/bye', (req, res) => {
    // res.json envía una salida en formato json, se envía
    // como parámetro un objeto javascript y se convierte a json
    res.json({ mensaje: 'Chau Mundo' })
})

app.post("/empty", (req, res) => {
    // res.end() permite no enviar content-type, solo respuesta
    res.end("Resultado sin content type")
})

app.get('/content', (req, res) => {
    // Podemos escribir cualquier header como
    res.set('Content-Type', 'text/html')

    // Pero hay varios que tienen su propio shortcut
    // como es el caso de content-type
    res.type('json')     // == 'application/json'

    res.end()
})

app.listen(3000, () => console.log("Server iniciado"))
