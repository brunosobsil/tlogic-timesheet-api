const dao = require('../dao/TimesheetDAO');

class TimesheetBO {
    
    obterTimesheet(timesheet){
        return dao.obterTimesheet(timesheet);
    }

    obterTimesheets(data_de, data_ate, cliente_de, cliente_ate, usuario_de, usuario_ate){
        return dao.obterTimesheets(data_de, data_ate, cliente_de, cliente_ate, usuario_de, usuario_ate);
    }

    async incluirTimesheet(timesheet){
        
        try {
            let tms = await dao.incluirTimesheet(timesheet);

            return {
                error: false,
                status_code: 201,
                status_message: 'Created',
                message: 'Timesheet incluindo com sucesso',
                body: tms
            }

        } catch (error) {
            console.log(error);
            return {
                error: true,
                status_code: 500,
                status_message: 'Server Error',
                message: 'erro ao inserir timesheet: ' + JSON.stringify(error)
            };
        }

    }

    async alterarTimesheet(timesheet){
        try {
            let tms = await dao.alterarTimesheet(timesheet);

            return {
                error: false,
                status_code: 200,
                status_message: 'OK',
                message: 'Timesheet alterado com sucesso'
            }

        } catch (error) {
            return {
                error: true,
                status_code: 500,
                status_message: 'Server Error',
                message: 'erro ao alterar timesheet'
            };
        }
    }

    async excluirTimesheet(timesheet){

        try {
            dao.excluirTimesheet(timesheet);

            return {
                error: false,
                status_code: 200,
                message: 'Timesheet excluido com sucesso'
            }
        } catch (error) {
            return {
                error: true,
                status_code: 500,
                status_message: 'Server Error',
                message: 'erro ao excluir timesheet'
            };
        }

    }

}

module.exports = new TimesheetBO();