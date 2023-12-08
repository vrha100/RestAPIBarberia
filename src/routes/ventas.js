const { Router } = require('express');
const route = Router();

const { postVentas, getVentas, cancelarVenta, cambiarEstado } = require('../controllers/ventas');

route.get('/venta', getVentas);
route.post('/venta', postVentas);
route.put('/venta/estadoventa/:id_ventas', cambiarEstado);
route.put('/venta/cancelar/:id_ventas', cancelarVenta);

module.exports = route;
