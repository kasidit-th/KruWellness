const { DataTypes } = require("sequelize");
const sequelize = require("../database/config.js");

const School_Info = sequelize.define("School_Info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  schoolname: { type: DataTypes.STRING, allowNull: false },
  servicearea: { type: DataTypes.STRING, allowNull: false },
  examunit: { type: DataTypes.STRING, allowNull: false },
  schooladdress: { type: DataTypes.JSON, allowNull: false },
});

module.exports = School_Info;
