const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/config");

const Pago = sequelize.define("Pago", {
  id_pago: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  monto: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  }
});

module.exports = Pago;
