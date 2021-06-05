class Feriado {

    constructor(data, descricao){
        this._data = data;
        this._descricao = descricao;
    }

    get data() {
        return this._data;
    }

    set data(data) {
        this._data = data;
    }

    get descricao() {
        return this._descricao;
    }

    set descricao(descricao) {
        this._descricao = descricao;
    }
}

module.exports = Feriado;