class Usuario {

    constructor(id, nome, email, senha, status) {
        this._id = id;
        this._nome = nome;
        this._email = email;
        this._senha = senha;
        this._status = status;
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

    get email() {
        return this._email;
    }

    set email(email) {
        this._email = email;
    }

    get senha() {
        return this._senha;
    }

    set senha(senha) {
        this._senha = senha;
    }

    get status() {
        return this._status;
    }

    set status(status) {
        this._status = status;
    }

}

module.exports = Usuario;