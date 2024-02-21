const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/config');

const Proveedores = sequelize.define('proveedores', {
  id_proveedor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      name: 'nombre',
      msg: 'El nombre ya está en uso',
    },
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      name: 'email',
      msg: 'El email ya está en uso o no es válido',
    },
    validate: {
      isEmail: {
        msg: 'El email debe tener un formato válido',
      },
    },
  },
  tipo_de_producto_servicio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    defaultValue: 'Activo',
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false, // Habilitar automáticamente createdAt y updatedAt
});

module.exports = Proveedores;

