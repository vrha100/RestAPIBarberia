const { Router } = require('express');
const route = Router();

const { getUsuarios, getUsuario, postUsuario, putUsuario, deleteUsuario} = require('../controllers/usuarios'); // Importa la función asignarRolUsuario del controlador de usuarios

route.get('/usuario', getUsuarios);
route.get('/usuario/:id', getUsuario);
route.post('/usuario', postUsuario);
route.put('/usuario/:id', putUsuario); // Asegúrate de corregir la ruta para actualizar un usuario
route.delete('/usuario/:id', deleteUsuario);



module.exports = route;
