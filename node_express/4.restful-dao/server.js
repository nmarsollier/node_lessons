const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const usersService = require("./users/users.service")

// Para configurar los body content type application/json
app.use(bodyParser.json());

// all funciona para todos get/post/etc..
app.get('/user/settings', usersService.getUserSettings)

app.listen(3000, () => console.log("Server iniciado"))
