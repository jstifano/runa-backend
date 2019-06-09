/***********************************************
* Servicio para manejar la gestion de usuarios *
************************************************/
let User = require('../models/user');

class UserService {

    static getEmployees(callback){
        // Busco al usuario por el email
        User.findAll({ where: { role: 'empleado'} }).then(users => {
            // Si hay users, existen empleados
            if(users.length !== 0){
                callback({code: 200, users: users});
            }
            else {
                callback({code: 200, users: []});
            }
        })
    }
}

module.exports = UserService;