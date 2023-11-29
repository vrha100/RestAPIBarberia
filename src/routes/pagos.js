const { Router } = require('express');
const route = Router();

const { getPago, getPagos, postPago, putPago, deletePago } = require('../controllers/pagos');

route.get('/pagos', getPagos);
route.get('/pagos/:id', getPago);
route.post('/pagos', postPago);
route.put('/pagos/:id', putPago);
route.delete('/pagos/:id', deletePago);

module.exports = route;
