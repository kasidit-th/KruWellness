const Sequelize = require('sequelize');
const sequelize = require('../database/config'); // your connectdb instance

const db = {};

// Load models
db.Form = require('./Form.js');
db.Personal_Info = require('./Personal_Info.js');
db.School_Info = require('./School_Info.js');
db.Welfare_Recipient = require('./Welfare_Recipient.js')

// Register associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;