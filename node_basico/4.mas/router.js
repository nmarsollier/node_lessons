const url = require("url");
const common = require("./common")

/* Handler del router

    routes tiene la siguiente estrucutra

    {
        "/path": {
            method: "GET|POST|DELETE|PUT|HEADER|OPTIONS",
            handler: functionToRun
        },
        ...
    }

    Method es un string con todos los methods que queramos permitir
*/
async function route(routes, request, response) {
    try {
        const method = request.method
        const path = url.parse(request.url).pathname
        console.log(`Handling ${method} ${path}`)

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
            common.handle404(request, response)
        }
    } catch (error) {
        common.handle500(request, response, error)
    }
};

// Esto es un modulo, solo las cosas exportadas pueden verse desde otros archivos
exports.route = route
