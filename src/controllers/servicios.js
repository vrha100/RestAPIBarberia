const {response}= require('express');
const Servicio = require('../models/servicios');

const getServicios = async (req, res = response) => {
    try {
        const listServicios = await Servicio.findAll();
        res.json({ listServicios });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: 'Error al obtener la lista de servicios.',
        });
    }
};

const getServicio = async (req, res = response) => {
    try {
        const { id } = req.params;
        const servicio = await Servicio.findByPk(id);

        if (servicio) {
            res.json(servicio);
        } else {
            res.status(404).json({ msg: `No se encontró el servicio con ID ${id}` });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: 'Error al obtener el servicio.',
        });
    }
};

const putServicio = async (req, res = response) => {
    const { id } = req.params;
    const body = req.body;

    try {
        const servicio = await Servicio.findByPk(id);

        if (servicio) {
            await servicio.update(body);
            res.json({
                msg: 'El servicio fue actualizado exitosamente.',
            });
        } else {
            res.status(404).json({ msg: `No se encontró el servicio con ID ${id}` });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: 'Error al actualizar el servicio.',
        });
    }
};

const postServicio = async (req, res = response) => {
    try {
        const { body } = req;

        // Validar los datos antes de crear un nuevo servicio
        if (!body.nombre || !body.valor) {
            return res.status(400).json({ msg: 'Todos los campos son obligatorios.' });
        }

        const nuevoServicio = await Servicio.create(body);

        res.status(201).json({
            msg: 'Se ha creado un nuevo servicio',
            servicio: nuevoServicio,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            msg: 'Error al crear un nuevo servicio.',
        });
    }
};

const deleteServicio = async (req, res = response) => {
    const { id } = req.params;

    try {
        const servicio = await Servicio.findByPk(id);

        if (servicio) {
            await servicio.destroy();
            res.json({ msg: 'El servicio fue eliminado exitosamente.' });
        } else {
            res.status(404).json({ msg: `No se encontró el servicio con ID ${id}` });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: 'Error al eliminar el servicio.',
        });
    }
};

module.exports = {
    getServicio,
    getServicios,
    postServicio,
    putServicio,
    deleteServicio,
};
