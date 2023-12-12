const { Router } = require('express');
const route = Router();

const { getCita, getCitas, getCitasServcios, postCita, putCita, putCitaEstado, deleteCita } = require('../controllers/citas');

route.get('/citas', getCitas);
route.get('/citas/servicios', getCitasServcios);
route.get('/citas/:id', getCita);
route.post('/citas', postCita);
route.put('/citas/:id/cambiarEstado', putCitaEstado);
route.put('/citas/:id', putCita);
route.delete('/citas/:id', deleteCita);

module.exports = route;
