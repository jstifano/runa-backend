/************************************************************
* Servicio para manejar las entradas y salidas del empleado *
*************************************************************/
let Entry = require('../models/entry');
let User = require('../models/user');

class EntryService {

    /*****************************************************
    * Metodo para crear la entrada y salida del empleado *
    ******************************************************/
    static createEntry(req, res, callback){
        if(!req.arrivalDate || !req.departureDate || !req.id_user || isNaN(id_user)){
            callback({code: 400, message: 'Parámetros inválidos'});
        }
        
        User.findAll({ where: {id: id_user} }).then(users => {
            if(users.length !== 0){
                if(users[0].dataValues.role === 'empleado'){
                    let newEntry = {
                        arrivalDate: req.arrivalDate,
                        departureDate: req.departureDate,
                        id_user: req.id_user,
                        createdAt: new Date(),
                        updatedAt: null
                    }    
                    sequelize.transaction().then(function(t){
                        Entry.create(newEntry, {transaction: t}).then(function(){
                            t.commit(); // Hago commit de la transacción de creación
                            callback({code: 200, entry: newEntry});
                        }).catch(function(error){
                            t.rollback(); // Si falla la transacción de creación, hago rollback
                            callback({code: 400, message: 'No se pudo registrar la entrada y salida del empleado'});
                        })
                    })
                }
                else {
                    callback({code: 400, message: 'No se le puede asignar horas de entrada/salida a un admin'});
                }
            }
            else {
                callback({code: 204, message: 'No existe el usuario que le quiere asignar horas de entrada/salida'});
            }
        })
    }

    /***********************************************************
    * Método para obtener las entradas y salidas de un usuario *
    ************************************************************/
    static getEntries(req, res, callback){
        if(!req.id || isNaN(req.id)){
            callback({code: 400, message: 'Parámetros inválidos'});    
        }

        Entry.findAll({where: {id_user: req.id}}).then(response => {
            if(entries.length !== 0){
                callback({code: 200, entries: response});      
            }
            else {
                callback({code: 204, entries: []});    
            }
        })
    }
}

module.exports = UserService;