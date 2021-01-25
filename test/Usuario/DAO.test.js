const UsuarioDAO = require("../../src/model/dao/UsuarioDAO");
const Usuario = require("../../src/model/entities/Usuario");

const ClienteDAO = require("../../src/model/dao/ClienteDAO");
const Cliente = require("../../src/model/entities/Cliente");

index();

async function index(){
    await incluir();
    await obter();
    await alterar();
    await obterTodos();
    await ativar();
}

async function incluir(){
    let c = new Cliente();
    c.id = 1;
    c = await ClienteDAO.obterCliente(c);

    let t = new Usuario();
    t.nome = "Maria Fernanda";
    t.endereco = "Av. das Americas";
    t.numero = "124";
    t.complemento = "casa 1";
    t.bairro = "Barra";
    t.cidade = "Rio de Janeiro";
    t.uf = "RJ";
    t.cep = "20541120";
    t.telefone = "2199999999";
    t.email = "maria@eu.com";
    t.senha = "123456";
    t.status = true;
    t.cpf = "500.926.021-26";
    t.perfil = 1;
    t.cliente = c;
    t.coordenador = new Usuario();
    t.coordenador.id = 1;

    let id = await UsuarioDAO.incluirUsuario(t);

    if(id > 0)
        console.log('Usuario incluido com sucesso. ID: ' + id);
    else
        console.error('Erro ao incluir usuario');

}

async function obter(){

    let t = new Usuario();
    t.id = 1;
    let t2 = await UsuarioDAO.obterUsuario(t);

    if(t2 != null)
        console.log('Usuario recuperado: ' + JSON.stringify(t2));
    else
        console.error('Nenhum usuario recuperado');

}

async function obterTodos(){

    let t2 = await UsuarioDAO.obterUsuarios();

    if(t2 != null)
        console.log('Usuarios recuperados: ' + JSON.stringify(t2));
    else
        console.error('Nenhum usuario recuperado');

}

async function alterar(){

    let c = new Cliente();
    c.id = 1;
    c = await ClienteDAO.obterCliente(c);

    let t = new Usuario();
    t.id = 1;
    t.nome = "Maria Fernanda Alt";
    t.endereco = "Av. das Americas  Alt 10005";
    t.email = "maria-alt@eu.com";
    t.senha = "123456";
    t.status = false;
    t.cpf = "500.926.021-29";
    t.perfil = 2;
    t.cliente = c;
    t.coordenador = new Usuario();

    await UsuarioDAO.alterarUsuario(t);
    let t2 = await UsuarioDAO.obterUsuario(t);

    if(t2 != null)
        console.log('Usuario alterado com sucesso: ' + JSON.stringify(t2));
    else
        console.error('Erro ao alterar usuario');

}

async function ativar(){

    let t = new Usuario();
    t.id = 1;

    await UsuarioDAO.ativarDesativarUsuario(t);
    let t2 = await UsuarioDAO.obterUsuario(t);

    if(t2 != null)
        console.log('Status do usuario alterado com sucesso. ID: ' + JSON.stringify(t2));
    else
        console.error('Erro ao excluir usuario');

}