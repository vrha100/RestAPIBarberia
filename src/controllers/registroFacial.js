const ImagenAdministrador = require('../models/registroFacial');

const registroFacialController = {
  registrarFacialAdmin: async (req, res) => {
    try {
      const { image } = req.body;

      // Guardar la imagen en la base de datos
      const nuevaImagen = await ImagenAdministrador.create({ imagen: image });

      // Respuesta de éxito con el ID de la imagen guardada
      return res.status(200).json({ message: 'Imagen del administrador guardada con éxito', id: nuevaImagen.id });
    } catch (error) {
      console.error('Error al guardar la imagen del administrador:', error);
      return res.status(500).json({ error: 'Error al guardar la imagen del administrador' });
    }
  },
};

module.exports = registroFacialController;
