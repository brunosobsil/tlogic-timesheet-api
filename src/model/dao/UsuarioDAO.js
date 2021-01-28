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
    /*
    async obterHorasPorUsuarios(dt_ini, dt_fin){
        const sqlQuery =  ' SELECT u.id, u.nome, EXTRACT(epoch FROM (SUM(os.data_hora_final - os.data_hora_inicio)) / 3600) as total' +
                        ' FROM "OrdemServicos" os' +
                        ' INNER JOIN "Agendamentos" a ON a.id = os.id_agendamento' +
                        ' INNER JOIN "Usuarios" u ON u.id = a.id_usuario' +
                        ' WHERE os.data_hora_inicio >= :dt1' +
                        ' AND os.data_hora_final <= :dt2' +
                        ' GROUP BY u.id, u.nome';

        const result = await Usuario.sequelize.query(
            sqlQuery, {
            replacements: {dt1: dt_ini, dt2: dt_fin},
            type: Usuario.sequelize.QueryTypes.SELECT,
        });

        return result;
    }
    */
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