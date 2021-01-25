/*
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'UsuarioHabilidades', // Nome da tabela no banco
      'id_usuario', // nome da coluna a ser criada
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Usuarios', // Tabela a ser referenciada
          key: 'id', // Coluna a ser referenciada
        },
        onDelete: 'SET NULL'
      }
    )
    .then(() => queryInterface.addColumn(
      'UsuarioHabilidades', // Nome da tabela no banco
      'id_habilidade', // nome da coluna a ser criada
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Habilidades', // Tabela a ser referenciada
          key: 'id', // Coluna a ser referenciada
        },
        onDelete: 'SET NULL'
      }
    ))
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    
  }
};
*/