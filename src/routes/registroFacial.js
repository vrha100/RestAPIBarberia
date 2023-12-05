
const { Router } = require('express');
const registroFacialController = require('../controllers/registroFacial'); // Importa tu controlador

const route = Router();

route.post('/registroFacialAdmin', registroFacialController.registrarFacialAdmin); // Usa el controlador para la ruta

module.exports = route;
