const Servicio = require('../models/servicios'); // Asegúrate de que tengas el modelo de Sequelize adecuado para "Servicio".
const { response } = require('express');

const getServicios = async (req, res = response) => {
    const listServicios = await Servicio.findAll();
    res.json({ listServicios });
}

const getServicio = async (req, res = response) => {
    const { id } = req.params;
    const servicio = await Servicio.findByPk(id);

    if (servicio) {
        res.json(servicio);
    } else {
        res.status(404).json({ error: `No se encontró el servicio con ID ${id}` });
    }
}

const putServicio = async (req, res = response) => {
    const { id } = req.params;
    const body = req.body;

    const servicio = await Servicio.findByPk(id);

    if (servicio) {
        await servicio.update(body);
        res.json({
            msg: `El servicio fue actualizado exitosamente.`
        });
    } else {
        res.status(404).json({ error: `No se encontró el servicio con ID ${id}` });
    }
}

const postServicio = async (req, res = response) => {
    const body = req.body;

    const nuevoServicio = await Servicio.create(body);
    res.json(nuevoServicio);
}

const deleteServicio = async (req, res = response) => {
    const { id } = req.params;
    const servicio = await Servicio.findByPk(id);

    if (servicio) {
        await servicio.destroy();
        res.json(`El servicio fue eliminado exitosamente.`);
    } else {
        res.status(404).json({ error: `No se encontró el servicio con ID ${id}` });
    }
}

module.exports = {
    getServicio,
    getServicios,
    postServicio,
    putServicio,
    deleteServicio
}
