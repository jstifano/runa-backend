/************************************************************************
* Archivo de pruebas unitarias para el controlador de login de usuarios *
* Controller ::: /services/LoginService.js                              *
*************************************************************************/
let assert = require('assert');
let LoginService = require('../services/LoginService');

describe('Pruebas para el controlador de login de usuario', function() {
    // Se prueba el servicio estático de login (authenticate)

    /********************************************************
    * Usuarios por defecto de admin usado para la prueba:   *
    * email --> admin@test.com                              *
    * contraseña --> admin123                               *
    *********************************************************/

    /***********************************************************
    * Usuarios por defecto de empleado usado para la prueba:   *
    * email --> empleado@test.com                              *
    * contraseña --> empleado123                               *
    ************************************************************/
    describe('#Servicio de login (autenticacion)', function() {
        it('El usuario se autentica con éxito', function() {
            let newUser = {
                email: 'admin@test.com',
                password: 'admin123'
            };
            LoginService.authenticate(newUser, null, response => {
                assert.equal(response.authenticate, true);
            })
        });
        it('El usuario no se puede autenticar', function() {
            let newUser = {
                email: 'admin@test.com',
                password: 'MAL PASSWORDDD'
            };
            
            LoginService.authenticate(newUser, null, response => {
                assert.equal(response.authenticate, false);
            })
        });
        it('El usuario envía un email inválido', function() {
            let newUser = {
                email: 'iqwuakskqjqieqn@-*-***/',
                password: 'admin123'
            };
            
            LoginService.authenticate(newUser, null, response => {
                assert.deepEqual(response, {code:400, message: 'Parámetros inválidos'});
            })
        });
        it('El usuario no envía el correo pero si la contraseña', function() {
            let newUser = {
                email: '',
                password: 'admin123'
            };
            LoginService.authenticate(newUser, null, response => {
                assert.deepEqual(response, {code: 400, message: 'Parámetros inválidos'});
            })
        });
        it('El usuario envía el correo pero no la contraseña', function() {
            let newUser = {
                email: 'admin@test.com',
                password: ''
            };
            LoginService.authenticate(newUser, null, response => {
                assert.deepEqual(response, {code: 400, message: 'Parámetros inválidos'});
            })
        });
        it('El usuario no envía ninguno de los dos valores', function() {
            let newUser = {
                email: undefined,
                password: undefined
            };
            LoginService.authenticate(newUser, null, response => {
                assert.deepEqual(response, {code: 400, message: 'Parámetros inválidos'});
            })
        });
        it('El usuario se autentica como administrador', function() {
            let newUser = {
                email: 'admin@test.com',
                password: 'admin123'
            };
            LoginService.authenticate(newUser, null, response => {
                assert.equal(response.user.role, 'admin');
            })
        });
        it('El usuario se autentica como empleado', function() {
            let newUser = {
                email: 'empleado@test.com',
                password: 'empleado123'
            };
            LoginService.authenticate(newUser, null, response => {
                assert.equal(response.user.role, 'employee');
            })
        });
    });
});