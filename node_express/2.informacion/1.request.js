const express = require('express')
const app = express()
var bodyParser = require('body-parser')

// Para configurar los body content type application/json
app.use(bodyParser.json());

//Para procesar los body application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// all funciona para todos get/post/etc..
app.all('/', (req, res) => {
    res.send(`
        <HTML>
            <BODY>
                <H1>Informaci&oacute;n del request</H1>
                <B>req.baseUrl:</B> ${req.baseUrl} <BR>
                <B>req.body:</B> ${JSON.stringify(req.body)} <BR>
                <B>req.hostname : </B> ${req.hostname} <BR>
                <B>req.method</B> ${req.method} <BR>
                <B>req.params</B> ${JSON.stringify(req.params)} <BR>
                <B>req.path</B> ${req.path} <BR>
                <B>req.protocol</B> ${req.protocol} <BR>
                <B>req.query</B> ${JSON.stringify(req.query)} <BR>
            </BODY>
        </HTML>
    `)
})

app.listen(3000, () => console.log("Server iniciado"))
