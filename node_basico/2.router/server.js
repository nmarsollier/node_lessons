const http = require("http")
const router = require("./router")
const greetings = require("./greetings")

const server = http.createServer((request, response) => {
    const routes = {
        "/": {
            method: "GET",
            handler: greetings.helloWorldRoute
        },
        "/hello": {
            method: "GET POST",
            handler: greetings.helloWorldRoute
        },
        "/bye": {
            method: "POST",
            handler: greetings.byeWorld
        },
        "/fail": {
            method: "GET",
            handler: greetings.testFail500
        }
    }

    router.route(routes, request, response)
})

server.listen(8888)
console.log("Servidor Iniciado.")


