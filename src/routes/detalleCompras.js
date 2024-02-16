const { Router } = require('express');
const route = Router();
const verificarToken = require('../middlewares/verificarToken');


const { getDetalleCompra, getDetalleCompras, postDetalleCompra, putDetalleCompra, deleteDetalleCompra } = require('../controllers/detalleCompras');
route.use(verificarToken);

route.get('/detalle-compras', getDetalleCompras);
route.get('/detalle-compras/:id', getDetalleCompra);
route.post('/detalle-compras', postDetalleCompra);
route.put('/detalle-compras/:id', putDetalleCompra);
route.delete('/detalle-compras/:id', deleteDetalleCompra);

module.exports = route;
