const Insumo = require('../models/insumos'); // Asegúrate de que tengas el modelo de Sequelize adecuado para "Insumo".
const { response } = require('express');

const getInsumos = async (req, res = response) => {
    const listInsumos = await Insumo.findAll();
    res.json({ listInsumos });
}

const getInsumo = async (req, res = response) => {
    const { id } = req.params;
    const insumo = await Insumo.findByPk(id);

    if (insumo) {
        res.json(insumo);
    } else {
        res.status(404).json({ error: `No se encontró el insumo con ID ${id}` });
    }
}

const putInsumo = async (req, res = response) => {
    const { id } = req.params;
    const body = req.body;

    const insumo = await Insumo.findByPk(id);

    if (insumo) {
        await insumo.update(body);
        res.json({
            msg: `El insumo fue actualizado exitosamente.`
        });
    } else {
        res.status(404).json({ error: `No se encontró el insumo con ID ${id}` });
    }
}

const postInsumo = async (req, res = response) => {
    const body = req.body;

    const nuevoInsumo = await Insumo.create(body);
    res.json(nuevoInsumo);
}

const deleteInsumo = async (req, res = response) => {
    const { id } = req.params;
    const insumo = await Insumo.findByPk(id);

    if (insumo) {
        await insumo.destroy();
        res.json(`El insumo fue eliminado exitosamente.`);
    } else {
        res.status(404).json({ error: `No se encontró el insumo con ID ${id}` });
    }
}

module.exports = {
    getInsumo,
    getInsumos,
    postInsumo,
    putInsumo,
    deleteInsumo
}
