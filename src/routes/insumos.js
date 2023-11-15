const { Router } = require('express');
const route = Router();

const { getInsumo, getInsumos, postInsumo, putInsumo, deleteInsumo } = require('../controllers/insumos');

route.get('/insumo', getInsumos);
route.get('/insumo/:id', getInsumo);
route.post('/insumo', postInsumo);
route.put('/insumo/:id', putInsumo);
route.delete('/insumo/:id', deleteInsumo);

module.exports = route;
