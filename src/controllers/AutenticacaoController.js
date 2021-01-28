const AutenticacaoBO = require('../model/bo/AutenticacaoBO');
const Usuario = require('../model/entities/Usuario');

class AutenticacaoController {
    async autenticarUsuario(req, res) {

        let usuario = new Usuario();
        usuario.senha = req.body.senha;
        usuario.email = req.body.email;

        let auth = await AutenticacaoBO.autenticarUsuario(usuario);
        res.send(auth);
    }

    async validarToken(req, res, next) {
        let auth = await AutenticacaoBO.validarToken(req);

        if(auth !== true){
            res.send(auth);
        }else{
            next();
        }
    }
}

module.exports = AutenticacaoController;