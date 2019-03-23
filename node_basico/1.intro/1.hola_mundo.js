// Node trae incluido el modulo http que nos permite
// lavantar un servidor para recuperar peticiones http
const http = require("http");

// createServer crea un servidor, con la function que
// se ejecuta cuando recibe una petición.
// Recibe una función que tiene 2 parámetros, el request y el response
const server = http.createServer((request, response) => {

    // El request contiene informacion del request http
    // En response nosotros escribimos nuestra respuesta

    // writeHead nos permite escribir en el header de la respuesta
    // primer parámetro status, segundo headers
    response.writeHead(200, { "Content-Type": "text/html" });

    // write escribe el body
    response.write("Hola Mundo");

    // end cierra y envía la respuesta
    response.end();
});

// Con listen el servidor se pone en escucha, en el puerto indicado
server.listen(8888);
console.log("Servidor Iniciado.");
