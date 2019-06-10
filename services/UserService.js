/***********************************************
* Servicio para manejar la gestion de usuarios *
************************************************/
let User = require('../models/user');
let ValidationService = require('./ValidationService');
let bcrypt = require('bcrypt');
const saltRounds = 10;

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

    /**********************************************************************
    * Servicio para crear un usuario con cualquier rol (Admin o Empleado) *
    ***********************************************************************/
    static create(req, res, callback){
        if(!ValidationService.checkValidEmail(req.email) || !ValidationService.checkOnlyLetters(req.first_name) || 
           !ValidationService.checkOnlyLetters(req.last_name) || req.password.length < 4 || req.password.length > 16 || 
           !ValidationService.checkRole(req.role)
        ){
            callback({code: 400, message: 'Parametros inválidos'});
        }    
        // Encripto la contraseña
        bcrypt.hash(req.password, saltRounds, function(err, hash) {
            // Guardo la contraseña hasheada en la base de datos
            let newUser = {
                first_name: req.first_name,
                last_name: req.last_name,
                email: req.email,
                password: hash,
                role: req.role
            }
            User.create(newUser).then(user => {
                callback({code: 200, user: user.dataValues});
            })
        }); 
    }

    /************************************************************
    * Servicio para poder editar un empleado dentro del sistema *
    *************************************************************/
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