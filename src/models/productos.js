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
    allowNull: false, 
  },

  precio: {
    type: DataTypes.FLOAT,
    allowNull: true, 
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: true, 
  },
  stockMax: {
    type: DataTypes.INTEGER,
    allowNull: false, 
  },
  stockMin: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM('Activo', 'Inactivo'),
    defaultValue: 'Activo',
  },
});

Productos.belongsTo(Proveedor, { foreignKey: "id_proveedor" });

module.exports = Productos;
