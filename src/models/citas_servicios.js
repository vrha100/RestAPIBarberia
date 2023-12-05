const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/config");
const Citas = require("./citas");
const Servicios = require("./servicios");

const Citas_Servicios = sequelize.define("citas_servicios", {
    id_cita: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_servicio: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    // Especifica que la combinación de id_cita e id_servicio es la clave primaria
    primaryKey: ['id_cita', 'id_servicio']
});

Citas_Servicios.belongsTo(Citas, { foreignKey: 'id_cita', as: 'Citas' });
Citas_Servicios.belongsTo(Servicios, { foreignKey: 'id_servicio', as: 'Servicios' });

module.exports = Citas_Servicios;