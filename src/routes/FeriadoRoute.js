const FeriadoController = require('../controllers/FeriadoController');
const controller = new FeriadoController();

module.exports = function (app) {
    app.get('/feriado', controller.obterFeriado);
    app.get('/feriado/:data', controller.obterFeriado);
    app.post('/feriado', controller.incluirFeriado);
    app.put('/feriado/:data', controller.alterarFeriado);
    app.delete('/feriado/:data/', controller.excluirFeriado);
}