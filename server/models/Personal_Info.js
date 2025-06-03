const { DataTypes } = require("sequelize");
const sequelize = require("../database/config.js");

const Personal_Info = sequelize.define("Personal_Info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  prefix: { type: DataTypes.STRING, allowNull: false },
  firstname: { type: DataTypes.STRING, allowNull: false },
  lastname: { type: DataTypes.STRING, allowNull: false },
  nickname: { type: DataTypes.STRING, allowNull: false },
  picture: { type: DataTypes.STRING, allowNull: true },
  birthdate: { type: DataTypes.STRING, allowNull: false },
  age: { type: DataTypes.INTEGER, allowNull: false },
  idcard_number: { type: DataTypes.INTEGER, allowNull: false },
  schoolposition: { type: DataTypes.STRING, allowNull: false },
  mobile_number: { type: DataTypes.INTEGER, allowNull: false },
  landline_number: { type: DataTypes.INTEGER, allowNull: false },
  address: { type: DataTypes.JSON, allowNull: false },
  marital_status: { type: DataTypes.BOOLEAN, allowNull: false },
  spouse_prefix: { type: DataTypes.STRING, allowNull: false },
  spouse_firstname: { type: DataTypes.STRING, allowNull: false },
  spouse_lastname: { type: DataTypes.STRING, allowNull: false },
  spouse_age: { type: DataTypes.INTEGER, allowNull: false },
  spouse_mobile_number: { type: DataTypes.INTEGER, allowNull: false },
});

Personal_Info.associate = (models) => {
  Personal_Info.hasMany(models.Welfare_Recipient, {
    foreignKey: "personid",
    as: "welfareInfos",
  });
  Personal_Info.belongsTo(models.Form, {
    foreignKey: "personid",
    as: "form_informer",
  });
};

module.exports = Personal_Info;
