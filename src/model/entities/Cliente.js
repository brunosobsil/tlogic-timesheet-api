class Cliente {

    constructor(id, nome){
        this._id = id;
        this._nome = nome;
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

}

module.exports = Cliente;