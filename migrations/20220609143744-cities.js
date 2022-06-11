'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable('cities', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(25),
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      governorateId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'governorates',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }
    }, { 
        uniqueKeys: {
          unique_tag: {
            fields: ["name"]
          }
        } 
    });
    
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('cities');
  }
};
