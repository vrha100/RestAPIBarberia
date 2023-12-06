const { Router } = require('express');
const route = Router();

const { postVentas, getVentas, anularVenta, cancelarVenta } = require('../controllers/ventas');

route.get('/venta', getVentas);
route.post('/venta', postVentas);
route.delete('/venta/:id', anularVenta);
route.put('/ventas/:id/cancelar', cancelarVenta);

module.exports = route;
