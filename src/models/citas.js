const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/config');

const Clientes = require('./clientes');
const Agendas = require('./agenda');
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
  id_agenda: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
});

// Vincular las llaves foráneas
Citas.belongsTo(Empleados, { foreignKey: 'id_empleado', as: 'empleados' });
Citas.belongsTo(Clientes, { foreignKey: 'id_cliente', as: 'clientes' });
Citas.belongsTo(Agendas, { foreignKey: 'id_agenda', as: 'Agenda' });

// Ahora las llaves foráneas están vinculadas

module.exports = Citas;