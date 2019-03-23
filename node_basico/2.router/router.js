var url = require("url");

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

/*
Este es similar al anterior, solo que routes ahora no es un
puntero a un funcion sino una estructura que nos permite
definir cual es el method que vamos a procesar y la funcion a llamar

Esto nos permite definir rutas para GET POST o cualquier otro method especifico
*/
async function route(routes, request, response) {
    try {
        const path = url.parse(request.url).pathname
        const method = request.method

        console.log(`Handling ${method} ${path}`)

        // Ahora evaluamos si existe la entrada en las rutas
        // Pero también que el method sea el adecuado para procesarla
        const routeFunc = routes[path]
        if (routeFunc
            && routeFunc.method.toUpperCase().indexOf(method.toUpperCase()) >= 0) {
            const promise = new Promise((resolve, reject) => {
                try {
                    routeFunc.handler(request, response)
                    resolve()
                } catch (error) {
                    reject(error)
                }
            });
            await promise
        } else {
            handle404(request, response)
        }
    } catch (error) {
        handle500(request, response, error)
    }
};

// Esto es un modulo, solo las cosas exportadas pueden verse desde otros archivos
exports.route = route
