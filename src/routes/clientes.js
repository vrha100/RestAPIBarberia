const {Router} = require('express')
const route = Router()

const { getCliente,getClientes,postCliente,putCliente,deleteCliente} = require('../controllers/clientes')

route.get('/cliente',getClientes),
route.get('/cliente/:id',getCliente),
route.post('/cliente',postCliente),
route.put('/cliente/:id',putCliente),
route.delete('/cliente/:id', deleteCliente)

module.exports = route