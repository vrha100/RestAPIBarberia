const { Router } = require('express');
const route = Router();

const { getProveedor,getProveedores, postProveedor, putProveedor, deleteProveedor, getProveedorProductos } = require('../controllers/proveedores');

route.get('/proveedores', getProveedores);
route.get('/proveedores/:id', getProveedor);
route.get('/proveedores/productos/:id', getProveedorProductos);
route.post('/proveedores', postProveedor);
route.put('/proveedores/:id', putProveedor);
route.delete('/proveedores/:id', deleteProveedor);

module.exports = route;
