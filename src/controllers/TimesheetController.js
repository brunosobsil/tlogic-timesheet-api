const Timesheet = require('../model/entities/Timesheet');
const TimesheetBO = require('../model/bo/TimesheetBO');

class TimesheetController {

    async obterTimesheet(req, res) {

        if (req.params.id) {
            // Obter timesheet por ID
            let timesheet = new Timesheet();
            timesheet.id = req.params.id;
            timesheet = await TimesheetBO.obterTimesheet(timesheet);
            res.send(timesheet);

        } else {
            // Obter todos os timesheets de acordo com parametros
            let tms = await TimesheetBO.obterTimesheets(req.params.data_de,
                                                        req.params.data_ate, 
                                                        req.params.cliente_de, 
                                                        req.params.cliente_ate, 
                                                        req.params.usuario_de, 
                                                        req.params.usuario_ate);
            res.send(tms);
        }

    }

    async incluirTimesheet(req, res) {

        let result;
        let timesheet = new Timesheet( null,
                                       req.body.usuario,
                                       req.body.data,
                                       req.body.cliente,
                                       req.body.apontamentos);
        timesheet = await TimesheetBO.incluirTimesheet(timesheet);

        if(timesheet.error) {
            result = { error: timesheet.message };
        } else {
            result = { id: timesheet.body, status: timesheet.status_code, message: timesheet.message };
        }

        res.status(timesheet.status_code).json(result);

    }

    async alterarTimesheet(req, res) {

        let result;
        let timesheet = new Timesheet( req.params.id,
                                       req.body.usuario,
                                       req.body.data,
                                       req.body.cliente,
                                       req.body.apontamentos);
        timesheet = await TimesheetBO.alterarTimesheet(timesheet);

        if(timesheet.error) {
            result = { error: timesheet.message };
        } else {
            result = { status: timesheet.status_code, message: timesheet.message };
        }

        res.status(timesheet.status_code).json(result);

    }

    async excluirTimesheet(req, res) {
        let result;
        let timesheet = new Timesheet( req.params.id,
                                       req.body.usuario,
                                       req.body.data,
                                       req.body.cliente,
                                       req.body.apontamentos);
        timesheet = await TimesheetBO.excluirTimesheet(timesheet);

        if(timesheet.error) {
            result = { error: timesheet.message };
        } else {
            result = { status: timesheet.status_code, message: timesheet.message };
        }

        res.status(timesheet.status_code).json(result);
    }

}

module.exports = TimesheetController;