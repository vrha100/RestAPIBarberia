const { Router } = require('express');
const route = Router();

const { postVentas, getVentas, anularVenta } = require('../controllers/ventas');

route.get('/venta', getVentas);
route.post('/venta', postVentas);
route.delete('/venta/:id', anularVenta);

module.exports = route;
