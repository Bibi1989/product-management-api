"use strict";
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    "Notification",
    {
      notify: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
      ProjectId: DataTypes.INTEGER,
      TaskId: DataTypes.STRING,
    },
    {}
  );
  Notification.associate = function (models) {
    // associations can be defined here
    Notification.belongsTo(models.User, {
      foreignKey: "UserId",
    });

    Notification.belongsTo(models.Project, {
      foreignKey: "ProjectId",
    });

    Notification.belongsTo(models.Task, {
      foreignKey: "TaskId",
    });
  };
  return Notification;
};
