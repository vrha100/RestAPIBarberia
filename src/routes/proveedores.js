const { Router } = require('express');
const route = Router();

const { getProveedor, getProveedores, postProveedor, putProveedor, deleteProveedor } = require('../controllers/proveedores');

route.get('/proveedores', getProveedores);
route.get('/proveedores/:id', getProveedor);
route.post('/proveedores', postProveedor);
route.put('/proveedores/:id', putProveedor);
route.delete('/proveedores/:id', deleteProveedor);

module.exports = route;
