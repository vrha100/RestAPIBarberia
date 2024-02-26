const { Router } = require('express');
const route = Router();
const verificarToken = require('../middlewares/verificarToken');


const { postVentas, getVentas, cancelarVenta, cambiarEstado } = require('../controllers/ventas');

route.get('/venta', verificarToken, getVentas);
route.post('/venta', verificarToken, postVentas);
route.put('/venta/estadoventa/:id_ventas', verificarToken, cambiarEstado);
route.put('/venta/cancelar/:id_ventas', verificarToken, cancelarVenta);

module.exports = route;
