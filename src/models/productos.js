const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/config');
const Proveedor = require('./proveedores')

const Productos = sequelize.define('productos', {
  id_producto: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_proveedor: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  estado: {
    type: DataTypes.STRING,
    defaultValue: 'Activo',
  }
});

Productos.belongsTo(Proveedor, { foreignKey: "id_proveedor" });

module.exports = Productos;
