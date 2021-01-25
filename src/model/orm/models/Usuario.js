module.exports = (sequelize, DataTypes) => {

    const Usuario = sequelize.define('Usuario', {
        nome: DataTypes.STRING,
        email: {type: DataTypes.STRING, unique: true},
        senha: DataTypes.STRING,
        status: DataTypes.BOOLEAN,
    });
    /*
    Usuario.associate = models => {
        Usuario.belongsToMany(models.Habilidade, {through: models.UsuarioHabilidade, foreignKey: 'id_usuario'})
        Usuario.hasMany(models.Atendimento, {foreignKey: 'id_usuario'})
        Usuario.hasMany(models.Agendamento, {foreignKey: 'id_usuario'})
        Usuario.hasMany(models.UsuarioHabilidade, {foreignKey: 'id_usuario'})
        Usuario.belongsTo(models.Cliente, { foreignKey: 'id_cliente', as: 'cliente'})
        Usuario.hasOne(models.Usuario, { foreignKey: 'id_coordenador'})
    }
    */

    return Usuario;
}