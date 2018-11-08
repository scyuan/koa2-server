const Sequelize = require('sequelize');
const config = require('../../config/config');
const fs = require('fs');
const path = require('path');
const db = {};

const sequelize = new Sequelize(config.db, {
  logging: true,
  timezone: '+08:00',
  define: {
    freezeTableName: true,
    timestamps: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci'
  },
  pool: {
    logging: true,
    max: 800,
    min: 0,
    idle: 10000
  }
})
fs.readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach(file => {
    let model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;