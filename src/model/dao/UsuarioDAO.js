const { Cliente, Usuario } = require('../orm/models');

class UsuarioDAO {

    async obterUsuario(usuario) {
        const user = await Usuario.findByPk(usuario.id);
        return user;
    }

    async obterUsuarios() {
        const users = await Usuario.findAll();
        return users;
    }

    async obterUsuariosPorEmail(usuario) {
        const user = await Usuario.findAll({
            where: { email: usuario.email },
        });
        return user;
    }
    // Um usuário específico
    async extratoHoras(usuario, data_de, data_ate){
        const query = 'SELECT * FROM extrato_horas(:id, :dt1, :dt2)';
        const result = await Usuario.sequelize.query(query, {
            replacements: {id: usuario.id, dt1: data_de, dt2: data_ate},
            type: Usuario.sequelize.QueryTypes.SELECT,
        });
        return result;
    }
    // Todos os usuários
    async extratoHorasPeriodo(data_de, data_ate){
        const query = 'SELECT * FROM extrato_tech(:dt1, :dt2)';
        const result = await Usuario.sequelize.query(query, {
            replacements: {dt1: data_de, dt2: data_ate},
            type: Usuario.sequelize.QueryTypes.SELECT,
        });
        return result;
    }

    async incluirUsuario(usuario) {
        let newUser = await Usuario.create({
              nome: usuario.nome,
              email: usuario.email,
              senha: usuario.senha,
              status: usuario.status,
              valor_hora: usuario.valor_hora
        });

        return newUser.id;
    }

    async alterarUsuario(usuario) {
        await Usuario.update({
            nome: usuario.nome,
            email: usuario.email,
            senha: usuario.senha,
            status: usuario.status,
            valor_hora: usuario.valor_hora
        }, {
            where: { id: usuario.id }
        });
    }

    async ativarDesativarUsuario(usuario) {
        let user = await this.obterUsuario(usuario);
        user.status = usuario.status;
        await user.save();
    }

    async obterUsuariosPorEmail(usuario) {
        const user = await Usuario.findAll({
            where: { email: usuario.email }
        });
        return user;
    }

}

module.exports = new UsuarioDAO();