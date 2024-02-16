const { Router } = require('express');
const route = Router();
const verificarToken = require('../middlewares/verificarToken');


const { getCompra, getCompras, postCompra, putCompra, deleteCompra, getComprasDetalles, cambiarEstadoCompra} = require('../controllers/compras');
route.use(verificarToken);

route.get('/compras', getCompras);
route.get('/compras/detalles', getComprasDetalles)
route.get('/compras/:id', getCompra);
route.post('/compras', postCompra);
route.put('/compras/:id', putCompra);
route.delete('/compras/:id', deleteCompra);
route.put('/compras/:id/cambiarEstado', cambiarEstadoCompra)

module.exports = route;
