const ClienteDAO = require("../../src/model/dao/ClienteDAO");
const Cliente = require("../../src/model/entities/Cliente");

index();

async function index(){
    await incluir();
    await obter();
    await alterar();
    await obterTodos();
//    await excluir();
}

async function incluir(){

    let t = new Cliente();
    t.nome = "Coca Cola RJ";
    t.endereco = "Av. dos testes, 999125";
    t.email = "maria@cocacola.com";
    t.status = true;
    t.razaoSocial = "Coca Cola Comercio de bebidas RJ";
    t.cnpj = "32.265.591-0002/58";
    t.nomeResponsavel = "Joaozinho da Coca dos Santos";

    let id = await ClienteDAO.incluirCliente(t);

    if(id > 0)
        console.log('Cliente incluido com sucesso. ID: ' + id);
    else
        console.error('Erro ao incluir cliente');

}

async function obter(){

    let t = new Cliente();
    t.id = 1;

    let t2 = await ClienteDAO.obterCliente(t);

    if(t2 != null)
        console.log('Cliente recuperado: ' + JSON.stringify(t2));
    else
        console.error('Nenhum cliente recuperado');

}

async function obterTodos(){

    let t = await ClienteDAO.obterClientes();

    if(t != null)
        console.log('Clientes recuperados: ' + JSON.stringify(t));
    else
        console.error('Nenhum cliente recuperado');

}

async function alterar(){

    let t = new Cliente();
    t.id = 1;
    t.nome = "Coca Cola Alt";
    t.endereco = "Av. dos testes 999126";
    t.email = "joao@cocacola.com.alt";
    t.status = false;
    t.razaoSocial = "Coca Cola Comercio de bebidas. Alt";
    t.cnpj = "32.265.591-0003/58";
    t.nomeResponsavel = "Joaozinho Alt da Coca dos Santos";

    await ClienteDAO.alterarCliente(t);
    let t2 = await ClienteDAO.obterCliente(t);
    
    if(t2 != null)
        console.log('Cliente alterado com sucesso: ' + JSON.stringify(t2));
    else
        console.error('Erro ao alterar cliente');

}

async function excluir(){

    let t = new Cliente();
    t.id = 1;

    await ClienteDAO.excluirCliente(t);
    let t2 = await ClienteDAO.obterCliente(t);
    
    if(t2 == null)
        console.log('Cliente excluido com sucesso. ID: ' + JSON.stringify(t2));
    else
        console.error('Erro ao excluir cliente');

}