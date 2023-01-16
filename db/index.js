const {Ring} = require('./Ring');
const {User} = require('./User');
const {sequelize, Sequelize} = require('./db');

Ring.belongsTo(User, {foreignKey: 'ownerId'});
User.hasMany(Ring);

module.exports = {
    Ring,
    User,
    sequelize,
    Sequelize
};
