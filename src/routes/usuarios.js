const { Router } = require('express');
const router = Router();  // Cambia 'route' por 'router'
const verificarToken = require('../middlewares/verificarToken');
const { getUsuarios, getUsuario, postUsuario, putUsuario, deleteUsuario, actualizarPerfil} = require('../controllers/usuarios');

router.get('/usuario', getUsuarios);
router.get('/usuario/:id', getUsuario);
router.post('/usuario', postUsuario);
router.put('/usuario/:id', putUsuario);
router.delete('/usuario/:id', deleteUsuario);

//router.put('/actualizarPerfil', actualizarPerfil);  // Utiliza 'actualizarPerfil' en lugar de 'usuariosController.actualizarPerfil'
router.put('/actualizarPerfil', verificarToken, actualizarPerfil);
module.exports = router;
