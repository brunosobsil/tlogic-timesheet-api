class Cliente {

    constructor(id, nome, valor_hora){
        this._id = id;
        this._nome = nome;
        this._valor_hora = valor_hora;
    }

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get nome() {
        return this._nome;
    }

    set nome(nome) {
        this._nome = nome;
    }

    get valor_hora() {
        return this._valor_hora;
    }

    set valor_hora(valor_hora) {
        this._valor_hora = valor_hora;
    }

}

module.exports = Cliente;