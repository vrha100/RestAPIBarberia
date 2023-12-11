const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/config');


const Productos = sequelize.define('productos', {
  id_producto: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
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
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0, 
  },

  precioVenta: {
    type: DataTypes.FLOAT,
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



module.exports = Productos;
