// backend/routes/resetPasswordRoutes.js
const express = require('express');
const router = express.Router();  // Asegúrate de usar express.Router() para crear el router

const resetPasswordController = require('../controllers/resetPassword');

// Ruta para solicitar restablecimiento de contraseña
router.post('/solicitar-restablecimiento', resetPasswordController.solicitarRestablecimiento);

router.post('/cambiar-contrasena', resetPasswordController.cambiarContrasena);


module.exports = router;
