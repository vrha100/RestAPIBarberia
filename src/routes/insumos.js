const { Router } = require('express');
const router = Router();
const verificarToken = require('../middlewares/verificarToken');
const {
    getInsumo,
    getInsumos,
    postInsumo,
    putInsumo,
    deleteInsumo
} = require('../controllers/insumos');

const {
    getInsumo,
    getInsumos,
    postInsumo,
    putInsumo,
    deleteInsumo
} = require('../controllers/insumos');

route.use(verificarToken);
route.get('/insumos', getInsumos);
route.get('/insumos/:id', getInsumo);
route.post('/insumos', postInsumo);
route.put('/insumos/:id', putInsumo);
route.delete('/insumos/:id', deleteInsumo);

module.exports = router;
