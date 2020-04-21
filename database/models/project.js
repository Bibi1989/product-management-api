"use strict";
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    "Project",
    {
      project_name: DataTypes.STRING,
      description: DataTypes.STRING,
      project_identifier: DataTypes.STRING,
      start_date: DataTypes.STRING,
      end_date: DataTypes.STRING,
    },
    {}
  );
  Project.associate = function (models) {
    // associations can be defined here
    Project.belongsTo(models.User, {
      foreignKey: "UserId",
    });
  };
  return Project;
};
