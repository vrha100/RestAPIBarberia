const {Router} = require('express')
const route = Router()
const verificarToken = require('../middlewares/verificarToken');
const { getEmpleados, getEmpleado, postEmpleado, putEmpleado, cambiarEstadoEmpleado } = require ('../controllers/empleados')

route.use(verificarToken);
route.get('/empleado', getEmpleados);
route.get('/empleado/:id', getEmpleado);
route.post('/empleado', postEmpleado);
route.put('/empleado/:id', putEmpleado);
route.put('/empleado/cambiarEstado/:id', cambiarEstadoEmpleado);


module.exports = route