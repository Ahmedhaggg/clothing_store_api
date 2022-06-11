'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('shippers', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM,
        values: ["busy", "available"]
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
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
    
    await queryInterface.dropTable('shippers');
  }
};
