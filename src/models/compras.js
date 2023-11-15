const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/config');

const Compras = sequelize.define('Compras', {
  id_compra: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_proveedor: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  producto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  precio_unitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  timestamps: false, // Desactivar automáticamente createdAt y updatedAt
});

module.exports = Compras;