const { Router } = require('express');
const router = Router();

const {
    getInsumo,
    getInsumos,
    postInsumo,
    putInsumo,
    deleteInsumo
} = require('../controllers/insumos');

router.get('/insumos', getInsumos);
router.get('/insumos/:id', getInsumo);
router.post('/insumos', postInsumo);
router.put('/insumos/:id', putInsumo);
router.delete('/insumos/:id', deleteInsumo);

module.exports = router;
