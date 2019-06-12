let router = require('express').Router();
let sequelize = require('../sequelize');
let EntryService = require('../services/EntryService');

/****************************************************************
* Controlador para registrar la entrada y salida de un empleado *
*****************************************************************/
router.post('/entry', function(req, res){
    EntryService.createEntry(req.body, res, function(response){
        return res.status(response.code).json(response);
    })   
})

/*******************************************************************
* Controlador para consultar las entradas y salidas de un empleado *
********************************************************************/
router.get('/entries/:id', function(req, res){
    EntryService.getEntries(req.params, res, function(response){
        return res.status(response.code).json(response);
    })
})

module.exports = router;
