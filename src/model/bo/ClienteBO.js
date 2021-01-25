const dao = require('../dao/ClienteDAO');

class ClienteBO {
    
    obterCliente(cliente){
        return dao.obterCliente(cliente);
    }

    obterClientes(){
        return dao.obterClientes();
    }

    async incluirCliente(cliente){
        const error = new Array();
        let cli = await dao.obterClientes();

        if (cli.length > 0) {

            if(cli.some(item => item.email === cliente.email)){
                error.push('já existe um cliente com esse email');
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
                cli = await dao.incluirCliente(cliente);

                return {
                    error: false,
                    status_code: 201,
                    status_message: 'Created',
                    message: 'cliente inserido com sucesso',
                    body: cli
                }

            } catch (error) {
                return {
                    error: true,
                    status_code: 500,
                    status_message: 'Server Error',
                    message: 'erro ao inserir cliente: ' + JSON.stringify(error)
                };
            }
        }

    }

    async alterarCliente(cliente){
        const error = new Array();

        if (cliente.id) {
            let cli = await dao.obterCliente(cliente);

            if (cli != null) {
                cli = await dao.obterClientes();

                if (cli.length > 0) {

                    if(cli.some(item => item.email === cliente.email && item.id != cliente.id)){
                        error.push('já existe um cliente com esse email');
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
                        cli = await dao.alterarCliente(cliente);

                        return {
                            error: false,
                            status_code: 200,
                            status_message: 'OK',
                            message: 'cliente alterado com sucesso'
                        }

                    } catch (error) {
                        return {
                            error: true,
                            status_code: 500,
                            status_message: 'Server Error',
                            message: 'erro ao alterar cliente'
                        };
                    }
                }
            } else {
                return {
                    error: true,
                    status_code: 404,
                    status_message: 'Not Found',
                    message: 'cliente não existe'
                }
            }
        } else {
            return {
                error: true,
                status_code: 409,
                status_message: 'Conflict',
                message: 'necessario informar o id do cliente'
            };
        }

    }

    async excluirCliente(cliente){
        const error = new Array();

        if (cliente.id) {
            let cli = await dao.obterCliente(cliente);

            if (cli) {

                try {
                    dao.excluirCliente(cliente);

                    return {
                        error: false,
                        status_code: 200,
                        message: 'cliente excluido com sucesso'
                    }
                } catch (error) {
                    return {
                        error: true,
                        status_code: 500,
                        status_message: 'Server Error',
                        message: 'erro ao excluir cliente'
                    };
                }
            } else {
                return {
                    error: true,
                    status_code: 404,
                    status_message: 'Not Found',
                    message: 'cliente não existe'
                }
            }
        } else {
            return {
                error: true,
                status_code: 409,
                status_message: 'Conflict',
                message: 'necessario informar o id do cliente'
            };
        }

    }

}

module.exports = new ClienteBO();