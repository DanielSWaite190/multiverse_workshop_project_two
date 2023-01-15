// module.exports = (sequelize, DataTypes) => {
//     const User = sequelize.define('user', {
//         username: DataTypes.STRING,
//         password: DataTypes.STRING
//     });
//     return User
// };


const {Sequelize, sequelize} = require('./db');

const User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

module.exports = { User };
