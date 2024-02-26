const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: "127.0.0.1",
    username: "root",
    password: "1001227509sS",
    database: "prueba",
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
