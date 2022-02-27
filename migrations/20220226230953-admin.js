'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable("admin", {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      email: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
        UN
      }
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable("admin");
  }
};
