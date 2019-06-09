/*******************************
* Modelo de entradas y salidas *
********************************/
let DataTypes = require('sequelize').DataTypes;
let seq = require('../sequelize');
let User = require('./user');

const Entry = seq.define('entry', {
    arrivalDate: {
        type: DataTypes.DATE
    },
    departureDate: {
        type: DataTypes.DATE
    }
}, {
    freezeTableName: true
})

module.exports = Entry;

