const Rol = require('../models/roles');
const Usuario = require('../models/usuarios');
const { response } = require('express');


const getRoles = async (req, res = response) => {
    try {
        const listaRoles = await Rol.findAll();
        res.json({ listaRoles });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener roles' });
    }
}

const getRol = async (req, res = response) => {
    const { id } = req.params;
    try {
        const rol = await Rol.findByPk(id);
        if (rol) {
            res.json(rol);
        } else {
            res.status(404).json({ error: `No se encontró el rol con ID ${id}` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el rol' });
    }
}

const putRol = async (req, res = response) => {
    const { id } = req.params;
    const body = req.body;
    try {
        const rol = await Rol.findByPk(id);
        if (rol) {
            await rol.update(body);
            res.json({
                msg: 'El rol fue actualizado exitosamente.'
            });
        } else {
            res.status(404).send(`No se encontró el rol con ID ${id}`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el rol' });
    }
}

const postRol = async (req, res = response) => {
    const { nombre, estado } = req.body;
    try {
        const newRol = await Rol.create({ nombre, estado });
        res.json(newRol);
    } catch (error) {
        console.error("Error al crear el rol:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

const deleteRol = async (req, res = response) => {
    const { id } = req.params;
    try {
        const rol = await Rol.findByPk(id);
        if (rol) {
            await rol.destroy();
            res.json('El rol fue eliminado exitosamente');
        } else {
            res.status(404).json({ error: `No se encontró un rol con ID ${id}` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el rol' });
    }
}
const asignarRolUsuario = async (req, res = response) => {
    const { id, id_rol } = req.body;

    try {
        const usuario = await Usuario.findByPk(id);
        const rol = await Rol.findByPk(id_rol);

        if (usuario && rol) {
            await usuario.update({ id_rol });
            res.json({ message: `Se ha asignado el rol con ID ${id_rol} al usuario con ID ${id}` });
        } else {
            res.status(404).json({ error: 'No se encontró un usuario o rol con el ID proporcionado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ha ocurrido un error al intentar asignar el rol al usuario' });
    }
}

module.exports = {
    getRol,
    getRoles,
    postRol,
    putRol,
    deleteRol,
    asignarRolUsuario
};

