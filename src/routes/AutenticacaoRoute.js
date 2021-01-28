const AutenticacaoController = require('../controllers/AutenticacaoController');
const controller = new AutenticacaoController();

module.exports = function (app) {
    app.post('/login', controller.autenticarUsuario);
}