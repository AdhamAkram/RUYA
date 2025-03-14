const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Device = sequelize.define("Device", {
  deviceId: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  pairedWith: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: "Users",
      key: "userId",
    },
  },
});

module.exports = Device;