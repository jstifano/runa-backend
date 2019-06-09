/*********************
* Modelo de usuarios *
**********************/
let DataTypes = require('sequelize').DataTypes;
let sequelize = require('../sequelize');
let Entry = require('./entry');

const User = sequelize.define('user', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true,
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true
        }
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true
        }
    }
}, {
    freezeTableName: true
})

User.hasMany(Entry, {as: 'entries', foreignKey: 'id'});
module.exports = User;