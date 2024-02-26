const { Router } = require('express');
const router = Router();
require('../controllers/insumos');

const verificarToken = require('../middlewares/verificarToken');
const {
    getInsumo,
    getInsumos,
    postInsumo,
    putInsumo,
    deleteInsumo
} = require('../controllers/insumos');


router.use(verificarToken);
router.get('/insumos', getInsumos);
router.get('/insumos/:id', getInsumo);
router.post('/insumos', postInsumo);
router.put('/insumos/:id', putInsumo);
router.delete('/insumos/:id', deleteInsumo);

module.exports = router;
