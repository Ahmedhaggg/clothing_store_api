'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable('users', { 
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        firstName: {
            type: Sequelize.STRING(20),
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING(20),
            allowNull: false
        },
        userName: {
            type: Sequelize.STRING(40),
            allowNull: false
        },
        email: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        password: {
            type: Sequelize.STRING(200),
            allowNull: false
        },
        gender: {
            type: Sequelize.ENUM,
            values: ["male", "female"],
            allowNull: false
        },
        phoneNumber: {
            type: Sequelize.STRING(11),
            allowNull: false
        },
        birthDay: {
            type: Sequelize.DATE,
            allowNull: false
        },
        verified: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        verified_at: {
            type: Sequelize.DATE,
            allowNull: true
        },
        lastLogin: {
            type: Sequelize.DATE,
            allowNull: true
        }
    }, { 
        uniqueKeys: {
          unique_tag: {
            fields: ["userName", "email", "phoneNumber"]
          }
        } 
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
