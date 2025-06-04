const { DataTypes } = require("sequelize");
const sequelize = require("../database/config.js");

const Welfare_Recipient = sequelize.define("Welfare_Info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  personid: { type: DataTypes.INTEGER, allowNull: false },
  relation: { type: DataTypes.STRING, allowNull: false },
  prefix: { type: DataTypes.STRING, allowNull: false },
  firstname: { type: DataTypes.STRING, allowNull: false },
  lastname: { type: DataTypes.STRING, allowNull: false },
});


module.exports = Welfare_Recipient;
