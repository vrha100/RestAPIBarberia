const { Router } = require('express');
const route = Router();

const { getCompra, getCompras, postCompra, putCompra, deleteCompra } = require('../controllers/compras');

route.get('/compras', getCompras);
route.get('/compras/:id', getCompra);
route.post('/compras', postCompra);
route.put('/compras/:id', putCompra);
route.delete('/compras/:id', deleteCompra);

module.exports = route;
