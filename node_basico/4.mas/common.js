const url = require("url");

// Handler error 500
function handle500(request, response, error) {
    response.writeHead(500)
    response.write(`Internal server error : ${error}`)
    response.end()
}

// Handler error 404
function handle404(request, response) {
    response.writeHead(404)
    response.write(`${url.parse(request.url).pathname} No se encuentra`)
    response.end()
}

// Esto es un modulo, solo las cosas exportadas pueden verse desde otros archivos
exports.handle404 = handle404
exports.handle500 = handle500
