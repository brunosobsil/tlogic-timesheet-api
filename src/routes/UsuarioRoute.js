const UsuarioController = require('../controllers/UsuarioController');
const controller = new UsuarioController();

module.exports = function (app) {
    app.get('/usuario', controller.obterUsuario);
    app.get('/usuario/:id', controller.obterUsuario);
    app.post('/usuario', controller.incluirUsuario);
    app.put('/usuario/:id', controller.alterarUsuario);
    app.put('/usuario/:id/status', controller.alterarStatusUsuario);
    app.get('/usuario/:id/data_de/:data_de/data_ate/:data_ate', controller.extratoHoras)
    app.get('/usuario/data_de/:data_de/data_ate/:data_ate', controller.extratoHorasPeriodo)
}