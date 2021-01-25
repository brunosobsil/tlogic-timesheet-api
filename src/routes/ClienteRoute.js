const ClienteController = require('../controllers/ClienteController');
const controller = new ClienteController();

module.exports = function (app) {
    app.get('/cliente', controller.obterCliente);
    app.get('/cliente/:id', controller.obterCliente);
    app.post('/cliente', controller.incluirCliente);
    app.put('/cliente/:id', controller.alterarCliente);
    app.delete('/cliente/:id/', controller.excluirCliente);
}