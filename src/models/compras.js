const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/config');
const Pago = require('./pagos');

const Compras = sequelize.define('Compras', {
  id_compra: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_pago: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  estado_compra: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  monto: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at',
});

Compras.belongsTo(Pago, {foreignKey: 'id_pago'})

module.exports = Compras;
