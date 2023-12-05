const { Router } = require('express');
const route = Router();

const { getCitaServicio, getCitasServicios, postCitaServicio, putCitaServicio, deleteCitaServicio} = require('../controllers/citas_servicios');

route.get('/citas_servicios', getCitasServicios);
route.get('/citas_servicios/:id', getCitaServicio);
route.post('/citas_servicios', postCitaServicio);
route.put('/citas_servicios/:id', putCitaServicio);
route.delete('/citas_servicios/:id', deleteCitaServicio);

module.exports = route;
