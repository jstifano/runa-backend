/***********************************************
* Servicio para manejar la gestion de usuarios *
************************************************/
let User = require('../models/user');

class UserService {

    static getEmployees(req, res, callback){
        if(!req.id || isNaN(req.id)){
            callback({code: 400, message: 'Parámtros inválidos'});        
        }

        User.findAll({where: {id: req.id}}).then(usersAdmin => {
            if(usersAdmin.length !== 0){
                if(usersAdmin[0].dataValues.role === 'admin'){
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
                else {
                    callback({code: 400, message: 'No tiene privilegios para obtener los empleados'});    
                }
            }
            else {
                callback({code: 204, message: 'El usuario no existe.'});        
            }
        })
    }

    static editEmployee(req, res, callback){
        if(!req.id || isNaN(req.id)){
            callback({code: 400, message: 'Parámtros inválidos'});        
        }

        User.findAll({where: {id: req.id}}).then(users => {
            if(users.length !== 0){
                if(users[0].dataValues.role === 'admin'){
                    User.update(req.body, {where: {id: req.body.id}}).then(userUpdated => {
                        if(userUpdated.length !== 0){
                            callback({code: 200, updated: true});
                        }
                        else {
                            callback({code: 200, updated: false});    
                        }
                    })
                }
                else {
                    callback({code: 400, message: 'No tiene privilegios para editar el empleado'});      
                }
            }
            else {
                callback({code: 204, message: 'El usuario no existe.'});        
            }    
        })
    }
}

module.exports = UserService;