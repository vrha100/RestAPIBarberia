const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/config');

const Insumo = sequelize.define('Insumo', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    
});

module.exports = Insumo;
