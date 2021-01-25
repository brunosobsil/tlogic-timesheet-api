module.exports = (sequelize, DataTypes) => {

    const Cliente = sequelize.define('Cliente', {
        nome: DataTypes.STRING,
    });
    /*
    Cliente.associate = models => {
        Cliente.hasMany(models.Usuario, {as: 'usuarios', foreignKey: 'id_cliente'})
    }
    */

    return Cliente;
}