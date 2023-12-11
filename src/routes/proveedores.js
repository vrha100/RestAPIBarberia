const { Router } = require('express');
const route = Router();
const verificarToken = require('../middlewares/verificarToken');

const { getProveedor,getProveedores, postProveedor, putProveedor, deleteProveedor, getProveedorProductos, cambiarEstadoProveedor } = require('../controllers/proveedores');

route.use(verificarToken);
route.get('/proveedores', getProveedores);
route.get('/proveedores/:id', getProveedor);
route.get('/proveedores/productos/:id', getProveedorProductos);
route.post('/proveedores', postProveedor);
route.put('/proveedores/:id', putProveedor);
route.put('/proveedores/:id/cambiarestado', cambiarEstadoProveedor)
route.delete('/proveedores/:id', deleteProveedor);

module.exports = route;
