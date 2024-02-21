const { Router } = require('express');
const route = Router();
const verificarToken = require('../middlewares/verificarToken');


const { getCitaServicio, getCitasServicios, postCitaServicio, putCitaServicio, deleteCitaServicio} = require('../controllers/citas_servicios');

route.get('/citas_servicios', verificarToken, getCitasServicios);
route.get('/citas_servicios/:id', verificarToken, getCitaServicio);
route.post('/citas_servicios', verificarToken, postCitaServicio);
route.put('/citas_servicios/:id', verificarToken, putCitaServicio);
route.delete('/citas_servicios/:id', verificarToken, deleteCitaServicio);

module.exports = route;
