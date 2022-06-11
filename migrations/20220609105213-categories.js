'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('categories', { 
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
      slug: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true
      }
    }, { 
        uniqueKeys: {
          unique_tag: {
            customIndex: true,
            fields: ["name"]
          }
        } 
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('categories');
     
  }
};
