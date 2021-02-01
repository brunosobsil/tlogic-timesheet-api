class Timesheet {
    constructor(id, usuario, data, cliente, observacao, apontamentos){
        this._id = id;
        this._usuario = usuario;
        this._data = data;
        this._cliente = cliente;
        this._obervacao = observacao;
        this._apontamentos = apontamentos;
    }

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get usuario() {
        return this._usuario;
    }

    set usuario(usuario) {
        this._usuario = usuario;
    }

    get data() {
        return this._data;
    }

    set data(data) {
        this._data = data;
    }

    get cliente() {
        return this._cliente;
    }

    set cliente(cliente) {
        this._cliente = cliente;
    }

    get observacao() {
        return this._obervacao;
    }

    set observacao(observacao) {
        this._observacao = observacao;
    }

    get apontamentos() {
        return this._apontamentos;
    }

    set apontamentos(apontamentos) {
        this._apontamentos = apontamentos;
    }
}

module.exports = Timesheet;