const express = require('express');
const cors = require('cors')
const body_parser = require('body-parser')

const {sequelize} = require('../database/config')

class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.path = '/api'
        this.middlewares()
        this.routes() 
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Esta escchando por el puerto ${this.port}`)
        }
    )}

    middlewares(){
        this.app.use(express.static(__dirname + "/public"))
        this.app.use(cors())
        this.app.use(body_parser.json())
    }

    routes(){
        this.app.use(this.path,require('../routes/roles')) 
        this.app.use(this.path,require('../routes/usuarios'))  
        this.app.use(this.path,require('../routes/permisos'))
        this.app.use(this.path,require('../routes/ventas')) 
        this.app.use(this.path,require('../routes/productos')) 
        this.app.use(this.path,require('../routes/agenda')) 
        this.app.use(this.path,require('../routes/citas'))  
        this.app.use(this.path,require('../routes/compras'))  
        this.app.use(this.path,require('../routes/proveedores'))
        this.app.use(this.path,require('../routes/insumos'))  
        this.app.use(this.path,require('../routes/clientes'))  
        this.app.use(this.path,require('../routes/servicios'))
        this.app.use(this.path,require('../routes/empleados'))

        
    }
}

module.exports = Server