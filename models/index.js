const dbConfig = require('../config/config/db-config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DATABASE, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT
});

const db = {}
db.sequelize = sequelize
db.modelse = {}
db.modelse.User = require('./user')(sequelize, Sequelize.DataTypes);
db.modelse.Ring = require('./Ring')(sequelize, Sequelize.DataTypes);
module.exports = db;