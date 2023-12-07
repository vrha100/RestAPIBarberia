const {Router} = require('express')
const route = Router()

const { getEmpleados, getEmpleado, postEmpleado, putEmpleado, cambiarEstadoEmpleado, getEmpleadoAgenda } = require ('../controllers/empleados')

route.get('/empleado', getEmpleados);
route.get('/empleado/:id', getEmpleado);
route.post('/empleado', postEmpleado);
route.put('/empleado/:id', putEmpleado);
route.put('/empleado/cambiarEstado/:id', cambiarEstadoEmpleado);


module.exports = route