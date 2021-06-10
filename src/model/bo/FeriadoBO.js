const dao = require('../dao/FeriadoDAO');

class FeriadoBO {
    
    obterFeriado(feriado){
        return dao.obterFeriado(feriado);
    }

    obterFeriados(){
        return dao.obterFeriados();
    }

    async incluirFeriado(feriado){
        const error = new Array();
        let fer = await dao.obterFeriados();

        if (fer.length > 0) {

            if(fer.some(item => item.data === feriado.data)){
                error.push('Essa data já está cadastrada como feriado!');
            }
            
        }

        if (error.length > 0) {
            return {
                error: true,
                status_code: 409,
                status_message: 'Conflict',
                message: error
            }
        } else {
            try {
                fer = await dao.incluirFeriado(feriado);

                return {
                    error: false,
                    status_code: 201,
                    status_message: 'Created',
                    message: 'feriado incluido com sucesso',
                    body: fer
                }

            } catch (error) {
                return {
                    error: true,
                    status_code: 500,
                    status_message: 'Server Error',
                    message: 'erro ao incluir feriado: ' + JSON.stringify(error)
                };
            }
        }

    }

    async incluirFeriados(feriados){
        
        const error = new Array();
        let fer = await dao.obterFeriados();

        if (fer.length > 0) {

            feriados.map(feriado => {
                if(fer.some(item => item.data === feriado.data)){
                    error.push(`Data já cadastrada: ${feriado.data}`);
                }
            })
            
        }

        if (error.length > 0) {
            return {
                error: true,
                status_code: 409,
                status_message: 'Conflict',
                message: error
            }
        } else {
            try {
                fer = await dao.incluirFeriados(feriados);

                return {
                    error: false,
                    status_code: 201,
                    status_message: 'Created',
                    message: 'feriados incluidos com sucesso',
                    body: fer
                }

            } catch (error) {
                return {
                    error: true,
                    status_code: 500,
                    status_message: 'Server Error',
                    message: 'erro ao incluir feriado: ' + JSON.stringify(error)
                };
            }
        }

    }

    async alterarFeriado(feriado){
        const error = new Array();

        if (feriado) {
            let fer = await dao.obterFeriado(feriado);

            if (fer != null) {
                fer = await dao.obterFeriados();

                if (error.length > 0) {
                    return {
                        error: true,
                        status_code: 409,
                        status_message: 'Conflict',
                        message: error
                    }
                } else {
                    try {
                        fer = await dao.alterarFeriado(feriado);

                        return {
                            error: false,
                            status_code: 200,
                            status_message: 'OK',
                            message: 'feriado alterado com sucesso'
                        }

                    } catch (error) {
                        return {
                            error: true,
                            status_code: 500,
                            status_message: 'Server Error',
                            message: 'erro ao alterar feriado'
                        };
                    }
                }
            } else {
                return {
                    error: true,
                    status_code: 404,
                    status_message: 'Not Found',
                    message: 'feriado não existe'
                }
            }
        } else {
            return {
                error: true,
                status_code: 404,
                status_message: 'Not Found',
                message: 'necessario informar um feriado'
            };
        }

    }

    async excluirFeriado(feriado){
        const error = new Array();

        if (feriado.data) {
            let fer = await dao.obterFeriado(feriado);

            if (fer) {

                try {
                    dao.excluirFeriado(feriado);

                    return {
                        error: false,
                        status_code: 200,
                        message: 'feriado excluido com sucesso'
                    }
                } catch (error) {
                    return {
                        error: true,
                        status_code: 500,
                        status_message: 'Server Error',
                        message: 'erro ao excluir feriado'
                    };
                }
            } else {
                return {
                    error: true,
                    status_code: 404,
                    status_message: 'Not Found',
                    message: 'feriado não encontrado'
                }
            }
        } else {
            return {
                error: true,
                status_code: 404,
                status_message: 'Not found',
                message: 'necessario informar um feriado'
            };
        }

    }

}

module.exports = new FeriadoBO();