const Usuario = require('../models/usuarios');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const generarToken = (usuario, tipoToken) => {
  const { id_usuario, nombre_usuario, rol } = usuario;
  const duracionTokenReset = '1d';

  if (tipoToken === 'reset') {
    return jwt.sign({ userId: id_usuario, tipo: 'reset' }, 'secreto-seguro', { expiresIn: duracionTokenReset });
  }

  return jwt.sign({ nombre_usuario, userId: id_usuario, rol }, 'secreto-seguro', { expiresIn: '24h' });
};


const solicitarRestablecimiento = async (req, res) => {
  const { correo } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { correo } });

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Generar token de restablecimiento y establecer la fecha de vencimiento
    const resetToken = generarToken(usuario, 'reset');
    const resetTokenExpires = moment().add(1, 'day').toDate(); // El token expira en 1 día

    // Actualizar en la base de datos
    await usuario.update({ reset_token: resetToken, reset_token_expires: resetTokenExpires });

    // Enviar correo electrónico con el enlace de recuperación que contiene el token
    await enviarCorreoRecuperacion(usuario.correo, resetToken);

    res.json({ mensaje: 'Correo de recuperación enviado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en la solicitud de restablecimiento de contraseña' });
  }
};
const enviarCorreoRecuperacion = async (correoTemporal, token) => {
  try {
    // Configuración del transporte de correo electrónico con ethereal.email
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'marisol.barrows98@ethereal.email',
        pass: 'QKUr1PDnNX67pSzS4A',
      },
    });

    // Configuración del contenido del correo electrónico
    const mailOptions = {
      from: 'simonzh1407@gmail.com',
      to: correoTemporal,
      subject: 'Recuperación de Contraseña',
      text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${token}`,
    };

    // Envío del correo electrónico
    const info = await transporter.sendMail(mailOptions);

    console.log(`Correo de recuperación enviado a ${correoTemporal}`);
    console.log('URL de prueba de correo:', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error(`Error al enviar el correo de recuperación a ${correoTemporal}:`, error);
    throw error;
  }
};

// Ejemplo de uso
const correoTemporal = 'kican97846@ethereal.email'; // Reemplaza con la dirección temporal de Ethereal Email
const token = 'token_de_prueba'; // Reemplaza con el token real

enviarCorreoRecuperacion(correoTemporal, token);


const cambiarContrasena = async (req, res) => {
  const { token, nuevaContrasena } = req.body;

  try {
    // Verifica y decodifica el token
    const decodedToken = jwt.verify(token, 'secreto-seguro');

    // Busca al usuario en la base de datos por el ID proporcionado en el token
    const usuario = await Usuario.findByPk(decodedToken.userId);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Verifica si el token de restablecimiento ha expirado
    if (moment().isAfter(decodedToken.exp * 1000)) {
      return res.status(400).json({ mensaje: 'El token de restablecimiento ha caducado' });
    }

    // Hashea la nueva contraseña y actualiza en la base de datos
    const hashedContrasena = await bcrypt.hash(nuevaContrasena, 10);
    await usuario.update({ contrasena: hashedContrasena, reset_token: null, reset_token_expires: null });

    res.json({ mensaje: 'Contraseña cambiada con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al cambiar la contraseña' });
  }
};



/*const recuperarContrasena = async (req, res) => {
  const { correo } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { correo } });

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Generar token de restablecimiento y establecer la fecha de vencimiento
    const resetToken = generarToken(usuario, 'reset');
    const resetTokenExpires = moment().add(1, 'day').toDate(); // El token expira en 1 día

    // Actualizar en la base de datos
    await usuario.update({ reset_token: resetToken, reset_token_expires: resetTokenExpires });

    // Enviar correo electrónico con el enlace de recuperación que contiene el token
    await enviarCorreoRecuperacion(usuario.correo, resetToken);

    res.json({ mensaje: 'Correo de recuperación enviado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en la recuperación de contraseña' });
  }
  */
  

module.exports = {solicitarRestablecimiento,cambiarContrasena};