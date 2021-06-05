const { Feriado } = require('../orm/models');

class FeriadoDAO {

    async obterFeriado(feriado) {
        const fer = await Feriado.findByPk(feriado.data);
        return fer;
    }

    async obterFeriados() {
        const feriados = await Feriado.findAll({
            order:[['data','ASC']]
        });
        return feriados;
    }

    async incluirFeriado(feriado) {
        let newFer = await Feriado.create({
              data: feriado.data,
              descricao: feriado.descricao
        });

        return newFer.data;
    }

    async alterarFeriado(feriado) {
        await Feriado.update({
            data: feriado.data,
            descricao: feriado.descricao
        }, {
            where: { data: feriado.data }
        });
    }

    async excluirFeriado(feriado) {
        await Feriado.destroy({
            where: { data: feriado.data }
        });
    }

}

module.exports = new FeriadoDAO();