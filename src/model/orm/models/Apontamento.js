module.exports = (sequelize, DataTypes) => {
    
    let Apontamento = sequelize.define('Apontamento', {
        sequencia: DataTypes.INTEGER,
        hora: DataTypes.DATE,
    });
    
    Apontamento.associate = models => {
        
        Apontamento.belongsTo(models.Timesheet, {foreignKey: 'id_timesheet', as: 'apontamentos', sourceKey: 'id'});
        
    };
    
    return Apontamento;
}