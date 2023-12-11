const { Router } = require('express');
const route = Router();
const verificarToken = require('../middlewares/verificarToken');
const { getCita, getCitas, postCita, putCita, deleteCita } = require('../controllers/citas');

route.use(verificarToken);
route.get('/citas', getCitas);
route.get('/citas/:id', getCita);
route.post('/citas', postCita);
route.put('/citas/:id', putCita);
route.delete('/citas/:id', deleteCita);

module.exports = route;
