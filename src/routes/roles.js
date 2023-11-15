const {Router} = require('express')
const route = Router()

const {getRol,getRoles,postRol,putRol,deleteRol,asignarRolUsuario} = require ('../controllers/roles')


route.get('/rol', getRoles),
route.get('/rol/:id', getRol),
route.post('/rol',postRol),
route.put('/rol/:id',putRol),
route.delete('/rol/:id', deleteRol),
route.post('/asignar-rol', asignarRolUsuario)


module.exports = route
