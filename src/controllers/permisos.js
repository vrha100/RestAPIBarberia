const Permiso = require('../models/permisos');
const { response } = require('express');

const axios = require('axios');

// Agrega el código de servicio de la API externa
const API_URL = 'http://localhost:8095/api/permisos';

const getPermisos = async (req, res = response) => {
    try {
        const listaPermisos = await Permiso.findAll();
        res.json({ listaPermisos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener permisos' });
    }
};

const getPermiso = async (req, res = response) => {
    const { id } = req.params;
    try {
        const permiso = await Permiso.findByPk(id);
        if (permiso) {
            res.json(permiso);
        } else {
            res.status(404).json({ error: `No se encontró el permiso con ID ${id}` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el permiso' });
    }
};

const postPermiso = async (req, res = response) => {
    try {
        const body = req.body; // Asumiendo que req.body es el objeto que quieres guardar

        // Crear un nuevo permiso utilizando los datos del cuerpo
        const nuevoPermiso = await Permiso.create(body);

        // Devolver el nuevo permiso creado en lugar del cuerpo original
        res.json(nuevoPermiso);
    } catch (error) {
        // Manejar cualquier error que pueda ocurrir durante el proceso
        console.error("Error al crear el permiso:", error);
        res.status(500).json({ error: "Hubo un error al crear el permiso" });
    }
};

const editPermiso = async (req, res = response) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    try {
        const permiso = await Permiso.findByPk(id);

        if (permiso) {
            await permiso.update({ nombre, descripcion });
            res.json({ message: 'Permiso actualizado con éxito' });
        } else {
            res.status(404).json({ error: `No se encontró el permiso con ID ${id}` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el permiso' });
    }
};

const deletePermiso = async (req, res = response) => {
    const { id } = req.params;

    try {
        const permiso = await Permiso.findByPk(id);

        if (permiso) {
            await permiso.destroy();
            res.json('Permiso eliminado exitosamente');
        } else {
            res.status(404).json({ error: `No se encontró el permiso con ID ${id}` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el permiso' });
    }
};

const asignarPermisoARol = async (req, res = response) => {
    try {
        const { idPermiso, idRol } = req.body;

        // Verificar si existe el permiso y el rol
        const permiso = await Permiso.findByPk(idPermiso);
        const rol = await Rol.findByPk(idRol);

        if (!permiso || !rol) {
            return res.status(404).json({ error: 'No se encontró el permiso o el rol con los IDs proporcionados' });
        }

        // Asignar el permiso al rol
        await rol.addPermiso(permiso);

        res.json({ message: `Se asignó el permiso con ID ${idPermiso} al rol con ID ${idRol}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al asignar el permiso al rol' });
    }
};


module.exports = {
    getPermisos,
    getPermiso,
    postPermiso,
    editPermiso,
    deletePermiso,
    asignarPermisoARol
};

