/****************************************************
* Servicio para manejar la lógica de login y logout *
*****************************************************/
let User = require('../models/user');
let bcrypt = require('bcrypt');

class LoginService {

    /********************************************************
    * Método para loguear al usuario dependiendo de su rol  *
    *********************************************************/
    static authenticate(req, res, callback){
        // El usuario no envió algunos de los parámetros requeridos
        if(!req.email || !req.password){
            callback({code: 400, message: 'Parámetros inválidos'});
        }

        // Busco al usuario por el email
        User.findAll({ where: { email: req.email} }).then(users => {
            // Si el usuario existe, compruebo su contraseña
            if(users.length !== 0){
                bcrypt.compare(req.password, users[0].dataValues.password, function(err, matchPassword){
                    if(matchPassword){
                        callback({ 
                            code: 200, 
                            authenticate: true, 
                            user: {
                                id: users[0].dataValues.id, 
                                first_name: users[0].dataValues.first_name,
                                last_name: users[0].dataValues.last_name,
                                role: users[0].dataValues.role
                            } 
                        }) // La contraseña enviada coincide con la del usuario, lo autentico
                    }
                    else {
                        callback({code: 200, authenticate: false})// No coinciden las contraseñas, no lo autentico.
                    }
                })
            }
            else {
                callback({code: 204, message: 'El usuario no existe.'});
            }
        })
    }   
}

module.exports = LoginService;