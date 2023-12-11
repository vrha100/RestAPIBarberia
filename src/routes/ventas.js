const { Router } = require('express');
const route = Router();
const verificarToken = require('../middlewares/verificarToken');

const { postVentas, getVentas, cancelarVenta, cambiarEstado } = require('../controllers/ventas');

route.use(verificarToken);
route.get('/venta', getVentas);
route.post('/venta', postVentas);
route.put('/venta/estadoventa/:id_ventas', cambiarEstado);
route.put('/venta/cancelar/:id_ventas', cancelarVenta);

module.exports = route;
