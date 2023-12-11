const { Router } = require('express');
const route = Router();
const verificarToken = require('../middlewares/verificarToken');
const { getUsuarios, getUsuario, postUsuario, putUsuario, deleteUsuario} = require('../controllers/usuarios'); // Importa la función asignarRolUsuario del controlador de usuarios


route.get('/usuario',verificarToken, getUsuarios);
route.get('/usuario/:id', verificarToken, getUsuario);
route.post('/usuario',postUsuario);
route.put('/usuario/:id', verificarToken, putUsuario); // Asegúrate de corregir la ruta para actualizar un usuario
route.delete('/usuario/:id', verificarToken,deleteUsuario);



module.exports = route;
