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