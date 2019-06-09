let router = require('express').Router();
let User = require('../models/user');
let sequelize = require('../sequelize');
let LoginService = require('../services/LoginService');

/*********************************************
* Controlador que maneja el login de usuario *
**********************************************/
router.post('/login', function(req, res){
    LoginService.authenticate(req.body, res, function(response){
        res.status(response.code).json(response);
    })
    /* sequelize.transaction().then(function(t){
        User.create({
            email: 'admin@test.com',
            password: 'admin123',
            role: 'admin'
        }, {transaction: t}).then(function(){
            t.commit(); // Hago commit de la transacción de creación
            return res.json({ok: "Se ejecuto"});
        }).catch(function(error){
            t.rollback(); // Si falla la transacción de creación, hago rollback
            return res.json({error: "Fallo la transacción de"});
        })
    }) */
    
})

module.exports = router;
