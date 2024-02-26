const { Router } = require('express');
const route = Router();
const verificarToken = require('../middlewares/verificarToken');


const { getDetalleCompra, getDetalleCompras, postDetalleCompra, putDetalleCompra, deleteDetalleCompra } = require('../controllers/detalleCompras');

route.get('/detalle-compras',verificarToken, getDetalleCompras);
route.get('/detalle-compras/:id',verificarToken, getDetalleCompra);
route.post('/detalle-compras',verificarToken, postDetalleCompra);
route.put('/detalle-compras/:id',verificarToken, putDetalleCompra);
route.delete('/detalle-compras/:id',verificarToken, deleteDetalleCompra);

module.exports = route;
