/*******************************
* Modelo de entradas y salidas *
********************************/
let DataTypes = require('sequelize').DataTypes;
let seq = require('../sequelize');
let User = require('./user');

const Entry = seq.define('entry', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    arrival_date: {
        type: DataTypes.STRING
    },
    departure_date: {
        type: DataTypes.STRING
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true
        }
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
})

module.exports = Entry;

