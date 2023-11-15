const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/config');


const Productos = sequelize.define('productos', {
  id_producto: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
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
  fecha_creacion: {
    type: DataTypes.DATE
  },
  estado: {
    type: DataTypes.STRING,
    defaultValue: 'true',
  }
});

module.exports = Productos;
