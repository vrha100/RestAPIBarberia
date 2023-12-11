const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/config');

const Permiso = sequelize.define('Permiso', {
    id_permiso: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    nombre_permiso: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: true,
        },
    },
}, {
    timestamps: true,
});

module.exports = Permiso;
