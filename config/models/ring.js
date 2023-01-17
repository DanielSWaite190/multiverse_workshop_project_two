module.exports = (sequelize, DataTypes) => {

    const Ring = sequelize.define('ring',
    {
        installation: DataTypes.STRING,
        range: DataTypes.INTEGER,
        array: DataTypes.INTEGER,
        anchor: DataTypes.STRING,
        operational: DataTypes.INTEGER
    },
    {

    });
    return Ring;
};