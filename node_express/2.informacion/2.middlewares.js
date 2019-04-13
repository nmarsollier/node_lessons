const express = require('express')
const app = express()
var bodyParser = require('body-parser')



// body parse es un middleware, cuando se usa con "use"
// se configura para todos los request, pero puede ser usado
// para solo alguna ruta en particular
app.post('/json', bodyParser.json(), (req, res) => {
    res.send(`
        <B>req.body:</B> ${JSON.stringify(req.body)} <BR>
    `)
})

const comprobarStop = (req, res, next) => {
    if (!req.query.stop) {
        res.status(500).end("stop, no encontrado")
    } else {
        req.valorPropio = req.query.stop
        next()
    }
}

app.get('/', comprobarStop, (req, res) => {
    res.send(`Valor de stop ${req.valorPropio}`)
})

app.listen(3000, () => console.log("Server iniciado"))
