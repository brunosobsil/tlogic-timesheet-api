const UsuarioController = require('../controllers/UsuarioController');
const controller = new UsuarioController();

module.exports = function (app) {
    app.get('/usuario', controller.obterUsuario);
    app.get('/usuario/:id', controller.obterUsuario);
    app.post('/usuario', controller.incluirUsuario);
    app.put('/usuario/:id', controller.alterarUsuario);
    app.put('/usuario/:id/status', controller.alterarStatusUsuario);
}