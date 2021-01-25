class Apontamento {
    constructor(id_timesheet, sequencia, hora){
        this._id_timesheet = id_timesheet;
        this._sequencia = sequencia;
        this._hora = hora;
    }

    get id_timesheet() {
        return this._id_timesheet;
    }

    set id_timesheet(id_timesheet) {
        this._id_timesheet = id_timesheet;
    }

    get sequencia() {
        return this._sequencia;
    }

    set sequencia(sequencia) {
        this._sequencia = sequencia;
    }

    get hora() {
        return this._hora;
    }

    set hora(hora) {
        this._hora = hora;
    }
}