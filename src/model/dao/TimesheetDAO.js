const { Timesheet } = require('../orm/models');
const { Apontamento } = require('../orm/models');
const { Op } = require('sequelize');

class TimesheetDAO {

    async obterTimesheet(timesheet) {
        
        let tms = await Timesheet.findByPk(timesheet.id, {
            include: [{model: Apontamento, as: 'apontamentos'}]
        });
        
        return tms;
    }

    async obterTimesheets(data_de, data_ate, cliente_de, cliente_ate, usuario_de, usuario_ate) {
        
        let tms = await Timesheet.findAll({
            where: { 
                data: { [Op.between]: [data_de, data_ate] },
                id_cliente: { [Op.between]: [cliente_de, cliente_ate] },
                id_usuario: { [Op.between]: [usuario_de, usuario_ate] }
            },
            include: [{model: Apontamento, as: 'apontamentos'}]
        });

        return tms;
    }

    async incluirTimesheet(timesheet) {
        
        let newTms = await Timesheet.create({
              data: timesheet.data,
              id_usuario: timesheet.usuario.id,
              id_cliente: timesheet.cliente.id
        });

        timesheet.apontamentos.map(async a => {
            await Apontamento.create({
                sequencia: a.sequencia,
                hora: a.hora,
                id_timesheet: newTms.id
            });
        });

        return newTms.id;
    }

    async alterarTimesheet(timesheet) {
        
        await Timesheet.update({
            data: timesheet.data,
            id_usuario: timesheet.usuario.id,
            id_cliente: timesheet.cliente.id
        }, {
            where: { id: timesheet.id }
        });
        
        await Apontamento.destroy({
            where: { id_timesheet: timesheet.id }
        });

        timesheet.apontamentos.map(async a => {
            await Apontamento.create({
                sequencia: a.sequencia,
                hora: a.hora,
                id_timesheet: timesheet.id
            });
        });

    }

    async excluirTimesheet(timesheet) {
        await Apontamento.destroy({
            where: { id_timesheet: timesheet.id }
        });
        await Timesheet.destroy({
            where: { id: timesheet.id }
        });
    }

}

module.exports = new TimesheetDAO();