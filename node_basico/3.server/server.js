const http = require("http")
const router = require("./router")
var url = require("url");

// En los ejemplo anteriores usabamos createServer con la funcion handler
const server = http.createServer();

// Pero tambien podemos crearlo hibrido, para definirlo mejor
server.on('request', (request, response) => {
    const routes = {
        "/": {
            method: "GET,POST,PUT",
            handler: info
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


// Nuestro negocio, muy simple
function info(request, response) {
    const method = request.method
    const requestUrl = request.url
    const headers = request.headers
    const body = request.body
    const parsedUrl = url.parse(request.url, true)

    const userAgent = headers['user-agent'];
    response.writeHead(200, { "Content-Type": "text/html" })
    response.write(`
        <HTML>
            <BODY>
                <H1>Informaci&oacute;n del request</H1>
                <B>Request method:</B> ${method} <BR>
                <B>Url Raw:</B> ${requestUrl} <BR>
                <B>Header userAgent : </B> ${userAgent} <BR>
                <B>Parsed Url</B> ${JSON.stringify(parsedUrl)} <BR>
                <B>Url Params</B> ${JSON.stringify(parsedUrl.query)} <BR>
                <B>Body</B> : ${body}
            </BODY>
        </HTML>
    `)
    response.end()
}