const { Cliente } = require('../orm/models');

class ClienteDAO {

    async obterCliente(cliente) {
        const cli = await Cliente.findByPk(cliente.id);
        return cli;
    }

    async obterClientes() {
        const clientes = await Cliente.findAll();
        return clientes;
    }

    async incluirCliente(cliente) {
        let newCli = await Cliente.create({
              nome: cliente.nome,
              valor_hora: cliente.valor_hora
        });

        return newCli.id;
    }

    async alterarCliente(cliente) {
        await Cliente.update({
            nome: cliente.nome,
            valor_hora: cliente.valor_hora
        }, {
            where: { id: cliente.id }
        });
    }

    async excluirCliente(cliente) {
        await Cliente.destroy({
            where: { id: cliente.id }
        });
    }

}

module.exports = new ClienteDAO();