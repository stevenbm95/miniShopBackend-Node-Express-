'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      username: { 
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
             
      },
      email: { 
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: { 
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      }
    })
  },

  async down (queryInterface, Sequelize) {
   
    await queryInterface.dropTable('users');
  }
};
