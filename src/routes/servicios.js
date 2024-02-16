const { Router } = require('express');
const route = Router();
const verificarToken = require('../middlewares/verificarToken');


const { getServicio, getServicios, postServicio, putServicio, deleteServicio } = require('../controllers/servicios');
route.use(verificarToken);

route.get('/servicio', getServicios);
route.get('/servicio/:id', getServicio);
route.post('/servicio', postServicio);
route.put('/servicio/:id', putServicio);
route.delete('/servicio/:id', deleteServicio);

module.exports = route;
