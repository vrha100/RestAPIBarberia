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

  precioCosto: {
    type: DataTypes.DOUBLE,
    allowNull: true,
    defaultValue: 0, 
  },

  precioVenta: {
    type: DataTypes.DOUBLE,
    allowNull: true,
    defaultValue: 0, 
  },
  
  stock: {
    type: DataTypes.INTEGER,
    allowNull: true, 
  },

  estado: {
    type: DataTypes.ENUM('Activo', 'Inactivo'),
    defaultValue: 'Activo',
  },
});

Productos.belongsTo(Proveedor, { foreignKey: "id_proveedor" });

module.exports = Productos;
