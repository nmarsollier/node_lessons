const http = require("http")
const router = require("./router")
const common = require("./common")
const fs = require("fs")

// En los ejemplo anteriores usabamos createServer con la funcion handler
const server = http.createServer();

// Pero tambien podemos crearlo hibrido, para definirlo mejor
server.on('request', (request, response) => {
    const routes = {
        "/": {
            method: "GET",
            handler: homePage
        }
    }

    let body = [];
    request.on('error', (err) => {
        console.error(err)
    }).on('data', (chunk) => {
        body.push(chunk)
    }).on('end', () => {
        body = Buffer.concat(body).toString()
        request.body = body
        router.route(routes, request, response)
    });
});

server.listen(8888)
console.log("Servidor Iniciado.")

function homePage(request, response) {
    fs.readFile('./views/home.html', function (err, data) {
        if (err) {
            common.handle404(request, response)
            return;
        }

        response.writeHead(200, { "Content-Type": "text/html" })
        response.write(data)
        response.end()
    })
}
