const Usuario = require('../models/usuarios');
const { response } = require('express');

const getUsuarios = async (req, res = response) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json({ usuarios });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener usuarios ' });
    }
}

const getUsuario = async (req, res = response) => {
    const { id } = req.params;

    try {
        const usuario = await Usuario.findByPk(id);

        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({ error: `No se encontro el  usuario con ID ${id}` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
}

const postUsuario = async (req, res = response) => {
    const newEntryData = req.body;

    // Verificar la presencia de la contraseña en la solicitud
    if (!newEntryData.contrasena) {
        return res.status(400).json({ error: 'La contraseña no se ha proporcionado correctamente' });
    }

    // Agregar un registro de depuración para verificar los datos de la solicitud
    console.log('Datos de la solicitud:', newEntryData);

    try {
        const createdUsuarioItem = await Usuario.create(newEntryData);
        res.status(201).json({ message: 'Usuario guardado exitosamente', usuario: createdUsuarioItem });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al crear un elemento de Usuario' });
    }
}


const putUsuario = async (req, res = response) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const usuario = await Usuario.findByPk(id);

        if (usuario) {
            await usuario.update(updatedData);
            res.json({
                msg: `El elemento de Usuario fue actualizado exitosamente.`
            });
        } else {
            res.status(404).json({ error: `No se encontró un elemento de Usuario con ID ${id}` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el elemento de Usuario' });
    }
}



const deleteUsuario = async (req, res = response) => {
    const { id } = req.params;

    try {
        const usuario = await Usuario.findByPk(id);

        if (usuario) {
            await usuario.destroy();
            res.json('Elemento de Usuario eliminado exitosamente');
        } else {
            res.status(404).json({ error: `No se encontró un elemento de usuario con ID ${id}` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el elemento de usuario' });
    }
}



module.exports = {
    getUsuario,
    getUsuarios,
    postUsuario,
    putUsuario,
    deleteUsuario,
  
};
