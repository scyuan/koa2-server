const Sequlize = require('sequelize');
const config = require('../../config/config');

const sequelize = new Sequlize(config.db, {
  logging: true,
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