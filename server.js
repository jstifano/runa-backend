/************************************
* API para prueba técnica de Runa   *
* @author:: Javier Stifano          *
*************************************/ 
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let config = require('./config');
let userRoutes = require('./routes/users');

/* Permitir acceso al body de la peticion */
app.use(bodyParser.json());

/* Permitir acceso a los parametros de la URL */
app.use(bodyParser.urlencoded({
    extended: true
}));

// ***** Rutas para el consumo de los servicios ***** //
app.use(config.apiEndpoint, userRoutes);
// ***** Rutas para el consumo de los servicios ***** //

/* sequelize.authenticate().then(() => {
    console.log("Conexión con la base de datos establecida.");
}); */

app.listen(3000, function(){
    console.log("Server running on port ::: 3000");
})

