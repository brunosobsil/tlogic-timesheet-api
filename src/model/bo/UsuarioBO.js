const dao = require('../dao/UsuarioDAO');
const config = require('../../../config.json');
const bcrypt  = require('bcrypt');

class UsuarioBO {

    obterUsuario(usuario){
        return dao.obterUsuario(usuario);
    }

    obterUsuarios(){
        return dao.obterUsuarios();
    }

    async incluirUsuario(usuario){
        const error = new Array();
        let usu = await dao.obterUsuarios();

        if (usu.length > 0) {
            
            if (usu.some(item => item.email === usuario.email)){
                error.push('email já cadastrado');
            }
        }

        if(error.length > 0){
            return {
                error: true,
                status_code: 409,
                status_message: 'Conflict',
                message: error
            };
        }else{
            try {
                usuario.senha = bcrypt.hashSync(usuario.senha, config.password_salt);
                usu = await dao.incluirUsuario(usuario);

                return {
                    error: false,
                    status_code: 201,
                    status_message: 'Created',
                    message: 'usuario inserido com sucesso',
                    body: usu
                }

            } catch (error) {
                return {
                    error: true,
                    status_code: 500,
                    status_message: 'Server Error',
                    message: 'erro ao inserir usuario: ' + JSON.stringify(error)
                };
            }
        }
    }

    async alterarUsuario(usuario){
        const error = new Array();

        if (usuario.id) {
            let usu = await dao.obterUsuario(usuario);

            if (usu != null) {
                usu = await dao.obterUsuarios();

                if (usu.length > 0) {


                    if (usu.some(item => item.email === usuario.email && item.id != usuario.id)){
                        error.push('email já cadastrado');
                    }

                    if(usuario.senha != usu.senha) {
                        usuario.senha = bcrypt.hashSync(usuario.senha, config.password_salt);
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
                        await dao.alterarUsuario(usuario);

                        return {
                            error: false,
                            status_code: 200,
                            status_message: 'OK',
                            message: 'usuario atualizado com sucesso'
                        }
                    } catch (error) {
                        return {
                            error: true,
                            status_code: 500,
                            status_message: 'Server Error',
                            message: 'erro ao alterar usuario'
                        };
                    }
                }
            } else {
                return {
                    error: true,
                    status_code: 404,
                    status_message: 'Not Found',
                    message: 'usuario não existe'
                }
            }
        } else {
            return {
                error: true,
                status_code: 409,
                status_message: 'Conflict',
                message: 'necessario informar o id do usuario'
            };
        }

    }

    async ativarDesativarUsuario(usuario){
        if (usuario.id) {
            let usu = await dao.obterUsuario(usuario);

            if (usu) {
                try {
                    usuario.status = !usuario.status;
                    dao.ativarDesativarUsuario(usuario);

                    return {
                        error: false,
                        status_code: 200,
                        message: 'status do usuario atualizado com sucesso'
                    }
                } catch (error) {
                    return {
                        error: true,
                        status_code: 500,
                        status_message: 'Server Error',
                        message: 'erro ao desativar usuario'
                    };
                }
            } else {
                return {
                    error: true,
                    status_code: 404,
                    status_message: 'Not Found',
                    message: 'usuario não existe'
                }
            }
        } else {
            return {
                error: true,
                status_code: 409,
                status_message: 'Conflict',
                message: 'necessario informar o id do usuario'
            };
        }

    }
    /*
    async obterHorasPorUsuarios(dt_ini, dt_fin){
        return await dao.obterHorasPorUsuarios(dt_ini, dt_fin);
    }
    */

}

module.exports = new UsuarioBO();