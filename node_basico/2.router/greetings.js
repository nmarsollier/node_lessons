// GET /hello
function helloWorldRoute(request, response) {
    response.writeHead(200, { "Content-Type": "text/html" })
    response.write("Hola Mundo")
    response.end()
}

// GET /bye
function byeWorld(request, response) {
    response.writeHead(200, { "Content-Type": "text/html" })
    response.write("Chau Mundo")
    response.end()
}

// Prueba de error Error 500 (mas abajo veremos)
function testFail500(request, response) {
    throw "Test de error"
}

// Esto es un modulo solo lo exportado puede verse desde afuera
exports.helloWorldRoute = helloWorldRoute
exports.byeWorld = byeWorld
exports.testFail500 = testFail500
