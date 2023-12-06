const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/config');

const Clientes = require('./clientes');
const Empleados = require('./empleados');

const Citas = sequelize.define('Citas', {
  id_cita: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  id_empleado: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_cliente: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Fecha_Atencion: {
    type: DataTypes.DATE,
  },
  Hora_Atencion: {
    type: DataTypes.TIME,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Vincular las llaves foráneas
Citas.belongsTo(Empleados, { foreignKey: 'id_empleado', as: 'empleados' });
Citas.belongsTo(Clientes, { foreignKey: 'id_cliente', as: 'clientes' });

// Ahora las llaves foráneas están vinculadas

module.exports = Citas;