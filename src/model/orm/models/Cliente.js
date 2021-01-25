module.exports = (sequelize, DataTypes) => {

    const Cliente = sequelize.define('Cliente', {
        nome: DataTypes.STRING,
        valor_hora: DataTypes.FLOAT
    });

    return Cliente;
}