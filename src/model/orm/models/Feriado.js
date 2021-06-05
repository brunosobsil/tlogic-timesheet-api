module.exports = (sequelize, DataTypes) => {

    const Feriado = sequelize.define('Feriado', {
        data: {
            type: DataTypes.DATEONLY,
            primaryKey: true
        },
        descricao: DataTypes.STRING
    });

    return Feriado;
}