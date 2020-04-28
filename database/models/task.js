"use strict";
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "Task",
    {
      summary: DataTypes.STRING,
      status: DataTypes.STRING,
      priorty: DataTypes.STRING,
      due_date: DataTypes.STRING,
      project_sequence: DataTypes.STRING,
      ProjectId: DataTypes.INTEGER,
    },
    {}
  );

  Task.associate = function (models) {
    // associations can be defined here
    Task.belongsTo(models.User, {
      foreignKey: "UserId",
    });
    Task.belongsTo(models.Project, {
      foreignKey: "ProjectId",
    });
  };
  return Task;
};
