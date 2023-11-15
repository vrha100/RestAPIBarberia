const { Router } = require('express');
const route = Router();

const { getAgenda, getAgendas, postAgenda, putAgenda, deleteAgenda } = require('../controllers/agenda');

route.get('/agenda', getAgendas);
route.get('/agenda/:id', getAgenda);
route.post('/agenda', postAgenda);
route.put('/agenda/:id', putAgenda);
route.delete('/agenda/:id', deleteAgenda);

module.exports = route;
