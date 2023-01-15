const {Sequelize, sequelize} = require('./db');

const Ring = sequelize.define('ring', {
    installation: Sequelize.STRING,
    range: Sequelize.INTEGER,
    array: Sequelize.INTEGER,
    anchor: Sequelize.STRING,
    operational: Sequelize.INTEGER
});

module.exports = { Ring };