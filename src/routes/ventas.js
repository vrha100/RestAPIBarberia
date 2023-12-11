const { Router } = require('express');
const route = Router();
const verificarToken = require('../middlewares/verificarToken');
const { postVentas, getVentas, anularVenta } = require('../controllers/ventas');

route.use(verificarToken);
route.get('/venta', getVentas);
route.post('/venta', postVentas);
route.delete('/venta/:id', anularVenta);

module.exports = route;
