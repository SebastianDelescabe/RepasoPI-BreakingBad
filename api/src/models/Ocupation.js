const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('ocupation', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
};