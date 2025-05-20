//importo el archivo app.js
import app from "./app.js";


import { config } from "./src/config.js";


//importo el archivo de conexion de la base de datos
import "./database.js";

//importo el archivo config
//Creo una funcion que ejecuta el servidor
async function main() {


    app.listen(config.server.port);

    console.log("Me prendio el servidor");
}

//Ejecuto la funcion
main();
