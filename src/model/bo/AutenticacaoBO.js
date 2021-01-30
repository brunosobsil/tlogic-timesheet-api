const dao = require('../dao/UsuarioDAO');
const jwt = require('jsonwebtoken');
const bcrypt  = require('bcrypt');
const config = require('../../../config.json');

class AutenticacaoBO {
    
    async autenticarUsuario(usuario){

        if(usuario.email && usuario.senha){
            let user = await dao.obterUsuariosPorEmail(usuario);

            if (user.length > 0) {

                if(! user[0].status){
                    return {
                        status_code: 401,
                        status_message: 'Unauthorized',
                        message: 'Usuário bloqueado'
                    };
                }

                if (bcrypt.hashSync(usuario.senha, config.password_salt) === user[0].senha) {
                    var token = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 24 * 60),
                        data: user[0].id,
                    }, config.jwt_hash);

                    return {
                        status_code: 200,
                        status_message: 'OK',
                        message: 'autenticado',
                        token: token,
                        usuario: {
                            nome: user[0].nome,
                            email: user[0].email,
                            id: user[0].id
                        }
                    };

                } else {
                    return {
                        status_code: 401,
                        status_message: 'Unauthorized',
                        message: 'acesso não autorizado'
                    };
                }
            } else {
                return {
                    status_code: 401,
                    status_message: 'Unauthorized',
                    message: 'acesso não autorizado'
                };
            }

        } else {
            return {
                status_code: 400,
                status_message: 'Bad Request',
                message: 'email e senha são obrigatórios'
            };
        }
    }

    async validarToken(req) {

        let requestSegments = req.path.split('/');

        // Verifica se pode ser acessado sem autenticação
        if(config.unsafe_routes.indexOf(requestSegments[1]) >= 0){
            return true;
        }else{

            let header = req.headers['authorization'];

            if(typeof header !== 'undefined') {

                let bearer = header.split(' ');
                let token = bearer[1];

                try {
                    let a = jwt.verify(token, config.jwt_hash);
                    return true;
                } catch(err) {
                    return {
                        status_code: 401,
                        status_message: 'Unauthorized',
                        message: 'acesso não autorizado'
                    };
                }

            } else {
                return {
                    status_code: 401,
                    status_message: 'Unauthorized',
                    message: 'acesso não autorizado'
                };
            }
        }
    }

}

module.exports = new AutenticacaoBO();