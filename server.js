/************************************
* API para prueba técnica de Runa   *
* @author:: Javier Stifano          *
*************************************/ 
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let config = require('./config');
let userRoutes = require('./routes/users');
let entryRoutes = require('./routes/entries');
let cors = require('cors');

/* Permitir acceso al body de la peticion */
app.use(bodyParser.json());

/* Permitir acceso a los parametros de la URL */
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors()); // Cors habilitado para el header Allow-Origin

// ***** Rutas para el consumo de los servicios ***** //
app.use(config.apiEndpoint, userRoutes);
app.use(config.apiEndpoint, entryRoutes);
// ***** Rutas para el consumo de los servicios ***** //

app.listen(5000, function(){
    console.log("Server running on port ::: 5000");
})

