"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Projects", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      project_name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      project_identifier: {
        type: Sequelize.STRING,
      },
      start_date: {
        type: Sequelize.STRING,
      },
      end_date: {
        type: Sequelize.STRING,
      },
      UserId: {
        type: Sequelize.INTEGER,
      },
      userArray: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Projects");
  },
};
