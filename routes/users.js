let router = require('express').Router();
let sequelize = require('../sequelize');
let LoginService = require('../services/LoginService');
let UserService = require('../services/UserService');

/*********************************************
* Controlador que maneja el login de usuario *
**********************************************/
router.post('/login', function(req, res){
    LoginService.authenticate(req.body, res, function(response){
        res.status(response.code).json(response);
    })
})
/*******************************************************************
* Controlador que devuelve todos los empleados con rol de Empleado *
********************************************************************/
router.get('/users/:id', function(req, res){
    UserService.getEmployees(req.params, res, function(response){
        res.status(response.code).json(response);    
    })
})

router.put('/user/:id', function(req, res){
    let data = {
        id: req.params.id,
        body: req.body
    };
    UserService.editEmployee(data, res, function(response){
        res.status(response.code).json(response);    
    })
})

module.exports = router;
