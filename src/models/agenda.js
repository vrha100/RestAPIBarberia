const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/config');

const Empleado = require('./empleados');

const Agenda = sequelize.define('Agendas', {
  id_agenda: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_empleado: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  motivo: {
    type: DataTypes.TEXT,
  },
  fechaInicio: {
    type: DataTypes.DATE,
  },
  fechaFin: {
    type: DataTypes.DATE,
  },
  horaInicio: {
    type: DataTypes.TIME,
  },
  horaFin: {
    type: DataTypes.TIME,
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

Agenda.belongsTo(Empleado, { foreignKey: 'id_empleado' });

module.exports = Agenda;
