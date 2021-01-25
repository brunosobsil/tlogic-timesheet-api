const Usuario = require('../model/entities/Usuario');
const UsuarioBO = require('../model/bo/UsuarioBO');

const Cliente = require('../model/entities/Cliente');
const ClienteBO = require('../model/bo/ClienteBO');

class UsuarioController {

    async obterUsuario(req, res) {

        if (req.params.id) {
            // Obter usuario por ID 
            let usuario = new Usuario();
            usuario.id = req.params.id;
            usuario = await UsuarioBO.obterUsuario(usuario);
            res.send(usuario);

        } else {
            // Obter todos os usuarios
            let usuarios = await UsuarioBO.obterUsuarios();
            res.send(usuarios);
        }

    }

    async incluirUsuario(req, res) {
        
        let result;

        let usuario = new Usuario( null, 
                                   req.body.nome, 
                                   req.body.email, 
                                   req.body.senha,
                                   req.body.status);
        usuario = await UsuarioBO.incluirUsuario(usuario);

        if(usuario.error) {
            result = { error: usuario.message };
        } else {
            result = { id: usuario.body };
        }

        res.status(usuario.status_code).json(result);
    }

    async alterarUsuario(req, res) {
        let result;

        let usuario = new Usuario(req.params.id,
                                  req.body.nome, 
                                  req.body.email, 
                                  req.body.senha,
                                  req.body.status);
        usuario = await UsuarioBO.alterarUsuario(usuario);

        if(usuario.error) {
            result = { error: usuario.message };
        } else {
            result = { info: usuario };
        }

        res.status(usuario.status_code).json(result);
    }

    async alterarStatusUsuario(req, res) {

        let usuario = new Usuario();
        let result;

        if (req.params.id) {
            usuario.id = req.params.id;
        }

        let usu = await UsuarioBO.ativarDesativarUsuario(usuario);

        if(usu.error) {
            result = { error: usu.message }
        } else {
            result = { info: usu}
        }

        res.status(usu.status_code).json(result);

    }

}

module.exports = UsuarioController;