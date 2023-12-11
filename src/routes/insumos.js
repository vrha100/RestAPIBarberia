const { Router } = require('express');
const route = Router();
const verificarToken = require('../middlewares/verificarToken');
const { getInsumo, getInsumos, postInsumo, putInsumo, deleteInsumo } = require('../controllers/insumos');

route.use(verificarToken);
route.get('/insumo', getInsumos);
route.get('/insumo/:id', getInsumo);
route.post('/insumo', postInsumo);
route.put('/insumo/:id', putInsumo);
route.delete('/insumo/:id', deleteInsumo);

module.exports = route;
