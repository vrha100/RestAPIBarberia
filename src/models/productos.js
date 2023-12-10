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
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  descripcion: {
    type: DataTypes.STRING,
    allowNull: false, // Cambiado a allowNull: true
  },

  precio: {
    type: DataTypes.FLOAT,
    allowNull: true, // Cambiado a allowNull: true
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: true, // Cambiado a allowNull: true
  },
  stockMax: {
    type: DataTypes.INTEGER,
    allowNull: false, // Cambiado a allowNull: true
  },
  stockMin: {
    type: DataTypes.INTEGER,
    allowNull: false, // Cambiado a allowNull: true
  },
  estado: {
    type: DataTypes.ENUM('Activo', 'Inactivo'),
    defaultValue: 'Activo',
  },
});

Productos.belongsTo(Proveedor, { foreignKey: "id_proveedor" });

module.exports = Productos;
