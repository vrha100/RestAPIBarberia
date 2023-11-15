const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/config');

const Empleado = require('./empleados'); // Asegúrate de importar el modelo de Empleado

const Agenda = sequelize.define('Agenda', {
  id_agenda: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_empleado: {
    type: DataTypes.INTEGER,
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
    type: DataTypes.STRING,
    defaultValue: 'true',
  },
  dias_laborales: {
    type: DataTypes.STRING(255),
  },
  
 
});

Agenda.belongsTo(Empleado, { foreignKey: 'id_empleado' }); // Define la relación con Empleado

module.exports = Agenda;
