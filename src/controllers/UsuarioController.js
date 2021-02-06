const Usuario = require('../model/entities/Usuario');
const UsuarioBO = require('../model/bo/UsuarioBO');

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
                                   req.body.status,
                                   req.body.valor_hora);

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
                                  req.body.status,
                                  req.body.valor_hora);
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

    async extratoHoras(req,res){
        
        let usuario; 
        let data_de;
        let data_ate;
        let result;
        
        if (req.params.id) {
            usuario = new Usuario();
            usuario.id = req.params.id;
        }

        if(req.params.data_de){
            data_de = req.params.data_de;
        }

        if(req.params.data_ate){
            data_ate = req.params.data_ate;
        }

        if(usuario && data_de && data_ate){
            result = await UsuarioBO.extratoHoras(usuario, data_de, data_ate);
            res.status(200).json(result);
        }else{
            res.status(400).json({message: 'Parametros invalidos'});
        }

    }

}

module.exports = UsuarioController;