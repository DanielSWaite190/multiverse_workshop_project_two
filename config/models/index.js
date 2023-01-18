// const dbConfig = require('../config/db-config');
const dbConfig = require('../db-config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DATABASE, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT
});

const db = {}
db.sequelize = sequelize;
db.models = {};
db.models.User = require('../models/users')(sequelize, Sequelize.DataTypes);
db.models.Ring = require('../models/ring')(sequelize, Sequelize.DataTypes);

db.models.User.hasMany(db.models.Ring)
db.models.Ring.belongsTo(db.models.User)

module.exports = db;