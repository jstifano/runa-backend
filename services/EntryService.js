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
        if(!req.arrivalDate || !req.departureDate || !req.id_user || isNaN(req.id_user)){
            callback({code: 400, message: 'Parámetros inválidos'});
        }
        
        User.findAll({ where: {id: req.id_user} }).then(users => {
            if(users.length !== 0){
                if(users[0].dataValues.role === 'employee'){
                    let newEntry = {
                        arrival_date: req.arrivalDate,
                        departure_date: req.departureDate,
                        id_user: req.id_user
                    }   
                    Entry.create(newEntry).then(entry => {
                        callback({code: 200, entry: newEntry});
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

        Entry.findAll({where: {id_user: req.id}}).then(entries => {
            if(entries.length !== 0){
                callback({code: 200, entries: entries});      
            }
            else {
                callback({code: 200, entries: []});    
            }
        })
    }
}

module.exports = EntryService;