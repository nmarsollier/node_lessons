const express = require('express')
const app = express()

// Los parametros query de get se obtienen en la propiedad query
app.get('/query', (req, res) => {
    res.send(req.query.valor.toUpperCase())
})

// Los parametros path se obtienen con params
app.get('/param/:valor', (req, res) => {
    res.send(req.params.valor.toUpperCase())
})

app.listen(3000, () => console.log("Server iniciado"))
