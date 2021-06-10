const Feriado = require('../model/entities/Feriado');
const FeriadoBO = require('../model/bo/FeriadoBO');

class FeriadoController {

    async obterFeriado(req, res) {

        if (req.params.data) {
            // Obter Feriado
            let feriado = new Feriado();
            feriado.data = req.params.data;
            feriado = await FeriadoBO.obterFeriado(Feriado);
            res.send(feriado);

        } else {
            // Obter todos os Feriados
            let feriados = await FeriadoBO.obterFeriados();
            res.send(feriados);
        }

    }

    async incluirFeriado(req, res) {

        let result;
        let feriado = new Feriado( req.body.data,
                                   req.body.descricao)
        feriado = await FeriadoBO.incluirFeriado(feriado);

        if(feriado.error) {
            result = { error: feriado.message };
        } else {
            result = { id: feriado.body, status: req.body.status, message: feriado.message };
        }

        res.status(feriado.status_code).json(result);

    }

    async incluirFeriados(req, res) {

        let result;
        let feriados = req.body;
        
        result = await FeriadoBO.incluirFeriados(feriados);

        if(result.error) {
            result = { status_code: 409, error: result.message };
        } else {
            result = { feriados: feriados, status_code: result.status_code, message: result.message };
        }

        res.status(result.status_code).json(result);

    }

    async alterarFeriado(req, res) {

        let result;
        let feriado = new Feriado( req.params.data, 
                                   req.body.descricao)
        feriado = await FeriadoBO.alterarFeriado(feriado);

        if(feriado.error) {
            result = { error: feriado.message };
        } else {
            result = { status: req.body.status, message: feriado.message };
        }

        res.status(feriado.status_code).json(result);

    }

    async excluirFeriado(req, res) {
        let feriado = new Feriado();
        let result;

        if (req.params.data) {
            feriado.data = req.params.data;
        }

        feriado = await FeriadoBO.excluirFeriado(feriado);

        if(feriado.error) {
            result = { error: feriado.message }
        } else {
            result = { status: req.body.status, message: feriado.message }
        }

        res.status(feriado.status_code).json(result);
    }

}

module.exports = FeriadoController;