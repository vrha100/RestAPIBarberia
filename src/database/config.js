const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: "monorail.proxy.rlwy.net",
    port: 52256,
    username: "root",
    password: "H5Fh3cdg1E1HdbB-1C2CDBacDB6Cfefc",
    database: "railway",
})

sequelize
    .authenticate()
    .then(() => {
        console.log("Conexión a la base de datos exitosa.");
    })
    .catch((err) => {
        console.log("Error al conectar a la base de datos.")
    })


sequelize.sync()
    .then(() => {
        console.log("Tablas sincronizadas con exito.")
    })
    .catch((err) => {
        console.log("Error al sincronizar las tablas " + err)
    })

module.exports = { sequelize }