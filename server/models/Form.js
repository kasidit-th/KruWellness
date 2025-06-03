const { DataTypes } = require("sequelize");
const sequelize = require("../database/config.js");

const Form = sequelize.define("Form", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  informdate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  personid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  welfareid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  schoolid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  copy_form: DataTypes.STRING,
  copy_idcard: DataTypes.STRING,
  copy_teachercard: DataTypes.STRING,
});

Form.associate = (models) => {
  Form.hasOne(models.Personal_Info, { foreignKey: "personid", as: "person" });
  Form.hasOne(models.Welfare_Recipient, { foreignKey: "welfareid", as: "welfare" });
  Form.hasOne(models.School_Info, { foreignKey: "schoolid", as: "school" });
};

module.exports = Form;