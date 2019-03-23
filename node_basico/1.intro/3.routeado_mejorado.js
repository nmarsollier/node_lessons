const http = require("http")
var url = require("url");

// Primero definimos todas las paginas que vamos a mostrar

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

/* Ahora definimos nuestro ruteador mejorado
   async nos va a permitir procesar multiples request en simultaneo

   routes es una estructura que indica la ruta y la función que la maneja

   {
        "/": helloWorldRoute,
        "/hello": helloWorldRoute,
        "/bye": byeWorld,
        "/fail": testFail500
    }

    de acuerdo a la ruta vamos a ejecutar la funcion indicada
*/
async function route(routes, request, response) {
    try {
        const pathname = url.parse(request.url).pathname;
        const routeFunc = routes[pathname]
        // Si existe una función para la ruta indicada, la ejecutamos
        if (routeFunc) {
            // Creamos una promesa para ejecutarla en otro proceso
            const promise = new Promise((resolve, reject) => {
                try {
                    // llamamos a la función hanlder del request
                    routeFunc(request, response)
                    resolve()
                } catch (error) {
                    // cualquier error va a saltar en el catch mas abajo
                    reject(error)
                }
            });
            await promise
        } else {
            // Sino enviamos 404 (pagina no encontrada)
            handle404(request, response)
        }
    } catch (error) {
        // Cualquier error lo capturamos y enviamos 500 con el error
        handle500(request, response, error)
    }
}

const server = http.createServer((request, response) => {
    const routes = {
        "/": helloWorldRoute,
        "/hello": helloWorldRoute,
        "/bye": byeWorld,
        "/fail": testFail500
    }

    route(routes, request, response)
})

server.listen(8888)
console.log("Servidor Iniciado.")


