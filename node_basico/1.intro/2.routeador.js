const http = require("http");
var url = require("url");

// Queremos manejar 2 paginas web diferentes,
// definimos sus handlers de la siguiente forma

// Procesa GET /hello
function helloWorldRoute(request, response) {
    response.writeHead(200, { "Content-Type": "text/html" })
    response.write("Hola Mundo")
}

// Procesa GET /bye
function byeWorld(request, response) {
    response.writeHead(200, { "Content-Type": "text/html" })
    response.write("Chau Mundo")
}

const server = http.createServer((request, response) => {
    const pathname = url.parse(request.url).pathname
    switch (pathname) {
        case "/":
        case "/hello":
            helloWorldRoute(request, response)
            break
        case "/bye":
            byeWorld(request, response)
            break
        default:
            response.writeHead(404)
    }
    response.end();
});

server.listen(8888);
console.log("Servidor Iniciado.")


