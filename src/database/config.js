const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: "sion-b-a-c.clcdddg4kbkn.us-east-1.rds.amazonaws.com",
    username: "sionbarbershop",
    password: "SS-vv-f-5",
    database: "dbbarberia",
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