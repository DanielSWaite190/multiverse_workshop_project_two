// index.js
// const dbConfig = require('../config/config/db-config');
// const Sequelize = require('sequelize');

// const sequelize = new Sequelize(dbConfig.DATABASE, dbConfig.USER, dbConfig.PASSWORD, {
//     host: dbConfig.HOST,
//     dialect: dbConfig.DIALECT
// });

// const db = {}
// db.sequelize = sequelize
// db.modelse = {}
// db.modelse.User = require('./User')(sequelize, Sequelize.DataTypes);
// db.modelse.Ring = require('./Ring')(sequelize, Sequelize.DataTypes);
// module.exports = db;


//db.js//
const path = require('path');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    HOST: 'localhost',
    DATABASE: 'mv_workshop_p2',
    USER: 'root',
    PASSWORD: 'whitelight',
    dialect: 'sqlite',
    storage: path.join(__dirname, 'db.sqlite'),
    logging: false
});

module.exports = {
    sequelize,
    Sequelize
};