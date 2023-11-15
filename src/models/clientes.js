const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/config');

const Clientes = sequelize.define('clientes', {

  id_cliente: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido:{
    type:DataTypes.STRING,
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false    
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});


module.exports = Clientes;