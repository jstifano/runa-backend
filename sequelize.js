/**********************************************
* Conexión de la base de datos con PostgreSQL *
***********************************************/
const Sequelize = require('sequelize');

const sequelize = new Sequelize('runadb', 'postgres', 'javier0315', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
})

module.exports = sequelize;