"use strict";
module.exports = (sequelize, DataTypes) => {
  const Invite = sequelize.define(
    "Invite",
    {
      accept: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      sender: DataTypes.STRING,
      receiver: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
      ProjectId: DataTypes.INTEGER,
    },
    {}
  );
  Invite.associate = function (models) {
    Invite.belongsTo(models.User);
  };
  return Invite;
};
