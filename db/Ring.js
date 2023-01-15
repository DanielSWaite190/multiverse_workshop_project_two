// module.exports = (sequelize, DataTypes) => {
//     const Ring = sequelize.define('user', {
//         installation: DataTypes.STRING,
//         range: DataTypes.INTEGER,
//         array: DataTypes.INTEGER,
//         anchor: DataTypes.STRING,
//         operational: DataTypes.INTEGER
//     });
//     return Ring
// };


const {Sequelize, sequelize} = require('./db');

const Ring = sequelize.define('ring', {
    installation: Sequelize.STRING,
    range: Sequelize.INTEGER,
    array: Sequelize.INTEGER,
    anchor: Sequelize.STRING,
    operational: Sequelize.INTEGER
});

module.exports = { Ring };
