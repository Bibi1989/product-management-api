"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Tasks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      summary: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      priorty: {
        type: Sequelize.STRING,
      },
      due_date: {
        type: Sequelize.STRING,
      },
      project_sequence: {
        type: Sequelize.STRING,
      },
      ProjectId: {
        type: Sequelize.INTEGER,
      },
      UserId: {
        type: Sequelize.INTEGER,
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
    return queryInterface.dropTable("Tasks");
  },
};
