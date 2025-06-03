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

Welfare_Recipient.associate = (models) => {
  Welfare_Recipient.belongsTo(models.Personal_Info, {
    foreignKey: "personid",
    as: "welfare_owner",
  });
  Welfare_Recipient.belongsTo(models.Form, {
    foreignKey: "welfareid",
    as: "welfare_recipient",
  });
};

module.exports = Welfare_Recipient;
