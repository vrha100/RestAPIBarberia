const { Router } = require('express');
const route = Router();
const verificarToken = require('../middlewares/verificarToken');
const { getRol, getRoles, postRol, putRol, deleteRol, asignarPermisoRol } = require('../controllers/roles');

route.use(verificarToken);

route.get('/rol', getRoles);
route.get('/rol/:id', getRol);
route.post('/rol', postRol);
route.put('/rol/:id', putRol);
route.delete('/rol/:id', deleteRol);

// Ruta para asignar permisos a un rol
route.post('/asignar-rol', asignarPermisoRol);

module.exports = route;
