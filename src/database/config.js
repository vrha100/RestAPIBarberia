const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: "viaduct.proxy.rlwy.net",
    port: 29533,
    username: "root",
    password: "321cC33Cb4H3cF4fhbF2BF1-aHhh2aed",
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