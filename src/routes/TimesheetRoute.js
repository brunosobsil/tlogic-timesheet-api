const TimesheetController = require('../controllers/TimesheetController');
const controller = new TimesheetController();

module.exports = function (app) {
    app.get('/timesheet/data_de/:data_de/data_ate/:data_ate/cliente_de/:cliente_de/cliente_ate/:cliente_ate/usuario_de/:usuario_de/usuario_ate/:usuario_ate', controller.obterTimesheet);
    app.get('/timesheet/:id', controller.obterTimesheet);
    app.post('/timesheet', controller.incluirTimesheet);
    app.put('/timesheet/:id', controller.alterarTimesheet);
    app.delete('/timesheet/:id/', controller.excluirTimesheet);
}