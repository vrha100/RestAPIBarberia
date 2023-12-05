// models/ImagenAdministrador.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/config');

const ImagenAdministrador = sequelize.define('ImagenesAdministrador', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  imagen: {
    type: DataTypes.TEXT, // O usa BLOB si prefieres almacenar la imagen en binario
    allowNull: false,
  },
});

module.exports = ImagenAdministrador;
