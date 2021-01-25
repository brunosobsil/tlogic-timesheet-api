module.exports = (sequelize, DataTypes) => {
    
    let Timesheet = sequelize.define('Timesheet', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        data: DataTypes.DATE
    });
    
    Timesheet.associate = models => {
        
        Timesheet.belongsTo(models.Usuario, {foreignKey: 'id_usuario', as: 'usuario'});
        Timesheet.belongsTo(models.Cliente, {foreignKey: 'id_cliente', as: 'cliente'});
        Timesheet.hasMany(models.Apontamento, {foreignKey: 'id_timesheet', as: 'apontamentos'});
    };
    
    return Timesheet;
}