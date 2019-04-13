const express = require('express')
const app = express()

app.get('/', (req, res) => { res.send("Hola Mundo") })

app.get('/error', (req, res) => { throw " Error generado " })


// use funciona como un intermediario, dependiendo de que se
// este configurando es que y donde se ejecuta.

// use con una función de 3 parámetros como se muestra a continuación
// es el handler para error 404
app.use(function (req, res, next) {
    // Notar el uso de status para cambiar el status code del response
    return res.status(404).json({ message: 'Error 404' });
});

// use con una función de 4 parámetros como se muestra a continuación
// es el handler para error 500
app.use(function (err, req, res, next) {
    return res.status(500).send({ error: err });
});

app.listen(3000, () => console.log("Server iniciado"))
