"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      isVerify: DataTypes.BOOLEAN,
      phone: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {}
  );
  User.associate = function (models) {
    User.hasMany(models.Project, {
      foreignKey: "UserId",
    });
    User.hasMany(models.Task, {
      foreignKey: "UserId",
    });
  };
  return User;
};
